import React, { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import defimg from "../default_image.png";
const ImageCard = ({ updateImageEditor }) => {
  const [objectURL, setObjectURL] = useState(null);
  const [responseCollector, setResponseCollector] = useState({
    data: {
      img: null,
      trans: null,
      audio: null,
      merged: null,
    },
  });

  const uploadToast = () => {
    toast.info("Uploading", {
      position: "top-center",
      autoClose: 1000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };
  const successGetToast = (msg) => {
    toast.success(msg, {
      position: "top-center",
      autoClose: 1000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };
  const notify = () => {
    toast.success("File Uploaded", {
      position: "top-center",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };
  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
  const fileHandler = (event) => {
    console.log(event.target.files[0].type);
    switch (event.target.files[0].type) {
      case "image/jpeg":
        uploadImagefile(event.target.files[0]);
        break;
      case "image/png":
        uploadImagefile(event.target.files[0]);
        break;
      case "image/jpg":
        uploadImagefile(event.target.files[0]);
        break;
      case "text/plain":
        uploadTranscript(event.target.files[0]);
        break;

      default:
        alert("Please upload a valid image file");
        document.getElementById("imageuploader").value = null;
        break;
    }
  };

  const uploadImagefile = async (file) => {
    uploadToast();
    setObjectURL(URL.createObjectURL(file));
    const formData = new FormData();
    console.log(file);
    formData.append("my_file", file);
    await axios
      .post("https://video-editor-api.herokuapp.com/upload_file", formData)
      .then(function (response) {
        console.log(response);
        setResponseCollector((prevState) => ({
          data: {
            ...prevState.data,
            img: response.data.file_path,
          },
        }));
        notify();
        console.log("IMAGE", response.data.file_path);
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  const uploadTranscript = async (file) => {
    const formData = new FormData();
    uploadToast();

    console.log(file);
    formData.append("my_file", file);

    await axios
      .post("https://video-editor-api.herokuapp.com/upload_file", formData)
      .then(function (response) {
        console.log(response);
        setResponseCollector((prevState) => ({
          data: {
            ...prevState.data,
            trans: response.data.file_path,
          },
        }));
        notify();

        console.log("TRANSCRIPT : ", response.data.file_path);
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  const generateAudio = async () => {
    console.log("clicked");
    toast.info("Generating Audio...", {
      position: "top-center",
      autoClose: false,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: false,
      progress: undefined,
    });
    await axios
      .post("https://video-editor-api.herokuapp.com/text_file_to_audio", {
        file_path: responseCollector.data.trans,
      })
      .then(function (response) {
        toast.dismiss();
        console.log(response);
        setResponseCollector((prevState) => ({
          data: {
            ...prevState.data,
            audio: response.data.audio_file_path,
          },
        }));
        successGetToast(capitalizeFirstLetter(response.data.message));
        console.log("AUDIO : ", response.data.audio_file_path);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const mergeImageAudio = async () => {
    console.log(responseCollector.data.img, responseCollector.data.audio);
    toast.info("Generating Video...", {
      position: "top-center",
      autoClose: false,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: false,
      progress: undefined,
    });
    await axios
      .post("https://video-editor-api.herokuapp.com/merge_image_and_audio", {
        image_file_path: responseCollector.data.img,
        audio_file_path: responseCollector.data.audio,
      })
      .then(function (response) {
        console.log(response);
        toast.dismiss();
        setResponseCollector((prevState) => ({
          data: {
            ...prevState.data,
            merged: response.data.video_file_path,
          },
        }));
        successGetToast(capitalizeFirstLetter(response.data.message));
        console.log("MERGED : ", response.data.video_file_path);
        ImageEditorManager(response.data.video_file_path);

        window.open(
          `https://video-editor-api.herokuapp.com/${response.data.video_file_path}`,
          "_blank"
        );
      })
      .catch(function (error) {
        toast.error("Something Went Wrong");
        console.log(error);
      });
  };

  const ImageEditorManager = (mergedata) => {
    console.log("first", responseCollector);

    let data = {
      img: responseCollector.data.img,
      trans: responseCollector.data.trans,
      audio: responseCollector.data.audio,
      merged: mergedata,
    };
    console.log("I - ", data);
    updateImageEditor(data);
  };
  return (
    <div>
      <div>
        <div className='imageEditComp'>
          <div className='img-thumb'>
            <img src={objectURL ? objectURL : defimg} alt='' />
          </div>
          <div className='upper-div'>
            <label className='btn'>
              Upload Image
              <input
                id='imageuploader'
                type='file'
                name='file'
                onChange={fileHandler}
              />
            </label>

            <label className='btn'>
              Upload Transcript
              <input
                id='transuploader'
                type='file'
                name='file'
                onChange={fileHandler}
              />
            </label>

            <button className='btn' onClick={generateAudio}>
              {" "}
              Generate Audio
            </button>
          </div>
          <div className='lower-div'>
            <button className='btn prime' onClick={mergeImageAudio}>
              Merge Image + Audio
            </button>
          </div>
        </div>
      </div>

      <ToastContainer />
    </div>
  );
};

export default ImageCard;
