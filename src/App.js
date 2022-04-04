import React, { useState, useEffect } from "react";
import ImageCard from "./components/ImageCard";
import VideoCard from "./components/VideoCard";
import "./App.css";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const App = () => {
  const [imgcounter, setimgCounter] = useState([1]);
  const [vidcounter, setvidCounter] = useState([1]);
  const [imageEditor, setImageEditor] = useState([]);
  const [videoEditor, setVideoEditor] = useState([]);
  const [sequalizer, setSequalizer] = useState([]);

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
  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
  const updateImageEditor = (data) => {
    setImageEditor((prev) => [
      ...prev,
      {
        data,
      },
    ]);
    handleSequalizer(data.merged);
  };
  const updateVideoEditor = (data) => {
    setVideoEditor((prev) => [
      ...prev,
      {
        data,
      },
    ]);
    handleSequalizer(data.merged);
  };
  const handleImgClick = () => {
    let arr = imgcounter;
    let ne = parseInt(arr.at(-1)) + 1;
    // console.log(arr);
    // console.log(ne);
    setimgCounter([...imgcounter, ne]);
    arr = 0;
    console.log(imgcounter);
  };

  const handleVidClick = () => {
    let arr = vidcounter;
    let ne = parseInt(arr.at(-1)) + 1;
    // console.log(arr);
    // console.log(ne);
    setvidCounter([...vidcounter, ne]);
    arr = 0;
    console.log(vidcounter);
  };
  const handleSequalizer = (data) => {
    setSequalizer((prev) => [...prev, data]);
  };
  const downloadFile = async (fileppath) => {
    console.log("Download path ", fileppath);
    window.location.replace(
      `https://video-editor-api.herokuapp.com/download_file?file_path=${fileppath}`
    );
  };
  const mergeAll = async () => {
    toast.info("Merging All Video...", {
      position: "top-center",
      autoClose: false,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: false,
      progress: undefined,
    });
    await axios
      .post("https://video-editor-api.herokuapp.com/merge_all_video", {
        video_file_path_list: Object.values(sequalizer),
      })
      .then(function (response) {
        console.log(response);
        toast.dismiss();

        successGetToast(capitalizeFirstLetter(response.data.message));
        console.log("MERGED : ", response.data.video_file_path);

        downloadFile(response.data.video_file_path);
      })
      .catch(function (error) {
        toast.error("Something Went Wrong");
        console.log(error);
      });
  };

  useEffect(() => {
    // console.log("IMG", imageEditor);
    // console.log("VID", videoEditor);
    console.log(Object.values(sequalizer));
    console.log(Object.values(sequalizer));
  }, [sequalizer]);

  return (
    //IMAGE UPLOAD + TRANSCRIPT
    <>
      <div className='main_container'>
        <div className='imageComp'>
          <div className='fixed'>
            <h1 className='heading'>Add Images</h1>
          </div>

          {imgcounter.map((value, index) => {
            return (
              <ImageCard key={index} updateImageEditor={updateImageEditor} />
            );
          })}
          <button className=' grad-btn' onClick={handleImgClick}>
            Add More Images
          </button>
        </div>
        <div className='imageComp'>
          <div className='fixed'>
            <h1 className='heading'>Add Videos</h1>
          </div>

          {vidcounter.map((value, index) => {
            return (
              <VideoCard key={index} updateVideoEditor={updateVideoEditor} />
            );
          })}
          <button className=' grad-btn' onClick={handleVidClick}>
            Add More Videos
          </button>
        </div>
      </div>
      <div className='end-btn-container'>
        <button
          className='end-btn'
          onClick={() => window.location.reload(false)}>
          Reset
        </button>
        <button className='end-btn' onClick={mergeAll}>
          Merge All
        </button>
      </div>
    </>
    //VIDEO UPLOAD + TRANSCRIPT
  );
};

export default App;
