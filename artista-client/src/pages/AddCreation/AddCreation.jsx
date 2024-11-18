import React, { useState } from "react";
import "./AddCreation.css";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function AddCreation() {
  const [imageFile, setImageFile] = useState(null);
  const [imageFileUploadError, setImageFileUploadError] = useState(null);
  const [formData, setFormData] = useState({});
  const [imageFileUploading, setImageFileUploading] = useState(false);
  const [publishError, setPublishError] = useState(null);
  const [publishing, setPublishing] = useState(false);
  const [imageFileURL, setImageFileURL] = useState(null);
  const navigate = useNavigate();

  const notify = () =>
    toast.success("Successfully added your work !", { autoClose: 1500 });

  const handleUploadImage = async (e) => {
    try {
      e.preventDefault();
      setImageFileUploading(true);
      const data = new FormData();
      data.append("file", imageFile);
      data.append("upload_preset", "artist-image-upload");
      data.append("cloud_name", "dfvbhw1tz");

      const res = await fetch(
        "https://api.cloudinary.com/v1_1/dfvbhw1tz/image/upload",
        {
          method: "POST",
          body: data,
        }
      );

      const uplLoadedImageUrl = await res.json();
      console.log(uplLoadedImageUrl.url);

      setFormData({ ...formData, imageUrl: uplLoadedImageUrl.url });
      setImageFileURL(uplLoadedImageUrl.url);
    } catch (error) {
      setImageFileUploadError(
        error.message ? error.message : "Something went wrong"
      );
      setImageFileUploading(false);
      notify()
    } finally {
      setImageFileUploading(false);
    }
  };

  console.log(formData);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setPublishing(true)
    try {
      const res = await fetch("/api/v1/post/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (!res.ok) {
        setPublishError(data.message);
        return;
      }
      if (res.ok) {
        setPublishError(null);
        navigate(`/home`);
      }
    } catch (error) {
      setPublishError("Something went wrong");
      setPublishing(false)
    }finally{
      setPublishing(false)
    }
  };

  return (
    <>
      <main className="px-5 pt-1 pb-5 main-content add-creation">
        <div className="d-flex justify-content-between align-content-center mb-3 mt-5">
          <h4 className="fw-lighter mt-5 text">Add your work</h4>
        </div>
        <div className="bg-purple shadow-lg p-3 rounded-3 col-lg-6">
          <form onSubmit={handleSubmit} className="row g-3 ">
            <small className="text-warning">{publishError&&publishError}</small>
            <div className="col-md-6">
              <label htmlFor="validationDefault01" className="form-label">
                Work title
              </label>
              <input
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
                type="text"
                className="form-control"
                placeholder="Mahatma Gandhi oil painting"
                id="title"
                value={formData.title}
                required
              />
            </div>
            <div className="col-md-6">
              <label htmlFor="price" className="form-label">
                Price in Rs
              </label>
              <input
                onChange={(e) =>
                  setFormData({ ...formData, price: e.target.value })
                }
                type="number"
                className="form-control"
                placeholder="256"
                id="price"
                value={formData.price}
                required
              />
            </div>
            <div className="col-md-12">
              <label htmlFor="validationDefault02" className="form-label">
                Work description
              </label>
              <textarea
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                className="form-control"
                id="exampleFormControlTextarea1"
                rows="3"
              ></textarea>
            </div>
            <div className="col-md-12">
              <div className="mb-2">
               
                
                <label htmlFor="formFile" className="form-label">
                  Upload work thumbnail
                </label>
                <input
                  onChange={(e) => setImageFile(e.target.files[0])}
                  className="form-control"
                  type="file"
                  accept="image/*"
                  id="formFile"
                />
                 <p><small className="text-warning">{imageFileUploadError && imageFileUploadError }</small></p>
              </div>
            </div>
            <div className="col-md-12 text-end mb-3">
              <button onClick={handleUploadImage} className="btn btn-secondary upload-btn shadow-lg">
              {imageFileUploading ? (
                <>
                  <div className="spinner-border spinner-border-sm" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </div>
                  <span className="mx-2">uploading...</span>
                </>
              ) : (
                "Upload Image"
              )}
                
              </button>
            </div>
            {imageFileURL && (
              <div className="row">
                <img className="w-50" src={imageFileURL} alt="" />
              </div>
            )}
            <div className="col-12">
              <button className="btn upload-btn-2 w-100 shadow-lg" type="submit">
              {publishing ? (
                <>
                  <div className="spinner-border spinner-border-sm" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </div>
                  <span className="mx-2">uploading...</span>
                </>
              ) : (
                "Add this work"
              )}
              </button>
            </div>
          </form>
        </div>
      </main>
    </>
  );
}

export default AddCreation;
