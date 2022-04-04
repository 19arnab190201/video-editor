'use strict'



var img_item = document.getElementById("img_item");
var vid_item = document.getElementById("vid_item");
var add_more_vid = document.getElementById("add_more_vid");
var add_more_img = document.getElementById("add_more_img");
var clear_all = document.getElementById("clear_all");
var merge_all = document.getElementById("merge_all");
var img_close_modal_but = document.getElementById("img_close_modal_but");
var video_player = document.getElementById("video_player");
var last_item = document.getElementById("last_item");



var input_up_file = document.getElementById("input_up_file");
// var img_item  = document.getElementById("img_item"); 
// var img_item  = document.getElementById("img_item"); 
// var img_item  = document.getElementById("img_item"); 
// var img_item  = document.getElementById("img_item"); 
// var img_item  = document.getElementById("img_item"); 
// var img_item  = document.getElementById("img_item"); 
// var img_item  = document.getElementById("img_item"); 


var curr_file_id;
var curr_file_type;
var curr_elem_id;
var converting_file_id_table = {};
var converting_file_count = 0;
// var converting_file_id =0; 



function send_ajax(param, url, method = "post", set_header = true) {

    return new Promise((resolve, reject) => {
        var xhttp = new XMLHttpRequest();

        xhttp.open(method, url, true);
        if (set_header) {
            // xhttp.setRequestHeader("Content-Type", "multipart/form-data");
            xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        }

        xhttp.onreadystatechange = () => {
            // console.log(xhttp.readyState);

            if (xhttp.readyState == 4) {
                // console.log(xhttp.responseText);
                // console.log("founded"); 
                if (xhttp.status >= 200 && xhttp.status < 300) {

                    resolve(xhttp.response);
                }
                else {
                    reject(xhttp.response);
                }
            }
        }
        xhttp.send(param);

    });

}








// send_ajax("req_type="+type+ "&f_name="+f_name+"&f_temp_id=" + f_temp_id +"&f_id_name=" + f_id_name , "./api_file/create_obj_folder.php", "post")
// .then((data) => {
//     console.log((data));

//     if(type=="creat_fold"){
//             window.location ="./admin_gallery_first.php"; 
//     }
// }).catch(error => {
//     // console.log(error);
// });










function add_more_img_to_item() {
    let c_count = img_item.childElementCount;
    let temp = document.createElement("div");
    temp.className = "img-box";
    temp.id = "img_box_" + c_count;
    temp.innerHTML = `
 
          <div class="img-prev" id='img_impv_${c_count}'>
        
              <div class="progress" id='img_prog_${c_count}'>
                  <div class="progress-bar" role="progressbar" style="width: 0%" aria-valuenow="50"
                      aria-valuemin="0" aria-valuemax="100"></div>
              </div>
          </div>
          <div class="middle-butt" id='img_mid_${c_count}'>
      
              <button type="button" id='img_upig_${c_count}' class="btn btn-primary">Upload Image</button>
              <button type="button" id='img_upts_${c_count}' class="btn btn-primary">Upload Transcript</button>
              <button type="button" id='img_crad_${c_count}' class="btn btn-primary">Create Audio</button>
              <button type="button" id='img_mgia_${c_count}' class="btn btn-primary">Merge Image+Audio</button>
          </div>
          <div class="video-prev"> </div>`;


    img_item.append(temp);
}


add_more_img.addEventListener("click", add_more_img_to_item);


function add_more_vid_to_item() {
    let c_count = vid_item.childElementCount;
    let temp = document.createElement("div");
    temp.className = "vid-box";
    temp.id = "vid_box_" + c_count;
    temp.innerHTML = ` 
     <div class="img-prev" id='vid_impv_${c_count}' >
         <div class="progress" id='vid_prog_${c_count}'>
             
             <div class="progress-bar" role="progressbar" style="width: 0%" aria-valuenow="50"
                 aria-valuemin="0" aria-valuemax="100"></div>
         </div>
     </div>
     <div class="middle-butt" id='vid_mid_${c_count}'>
     
         <button type="button" id='vid_upvd_${c_count}' class="btn btn-primary">Upload Video</button>
         <button type="button" id='vid_upts_${c_count}' class="btn btn-primary">Upload Transcript</button>
         <button type="button" id='vid_crad_${c_count}' class="btn btn-primary">Create Audio</button>
         <button type="button" id='vid_mgva_${c_count}' class="btn btn-primary">Merge Video+Audio</button>
     </div>
     <div class="video-prev" id='vid_vdpv_${c_count}'> </div>
     `;


    vid_item.append(temp);

}

add_more_vid.addEventListener("click", () => {
    console.log("clic add ");
    // vid_item.children[1]; 
    let c_count = vid_item.childElementCount;
    let temp = document.createElement("div");
    temp.className = "vid-box";
    temp.id = "vid_box_" + c_count;
    temp.innerHTML = ` 
     <div class="img-prev" id='vid_impv_${c_count}' >
         <div class="progress" id='vid_prog_${c_count}'>
             <input type="file" id='vid_tbup_${c_count}' >
             <div class="progress-bar" role="progressbar" style="width: 0%" aria-valuenow="50"
                 aria-valuemin="0" aria-valuemax="100"></div>
         </div>
     </div>
     <div class="middle-butt" id='vid_mid_${c_count}'>
     
         <button type="button" id='vid_upvd_${c_count}' class="btn btn-primary">Upload Video</button>
         <button type="button" id='vid_upts_${c_count}' class="btn btn-primary">Upload Transcript</button>
         <button type="button" id='vid_crad_${c_count}' class="btn btn-primary">Create Audio</button>
         <button type="button" id='vid_mgva_${c_count}' class="btn btn-primary">Merge Video+Audio</button>
     </div>
     <div class="video-prev" id='vid_vdpv_${c_count}'> </div>
     `;


    vid_item.append(temp);


});

// video_player.src="./public/samplevid.mp4"
add_more_img_to_item();
add_more_vid_to_item();

img_item.addEventListener("click", (e) => {

    console.log("class = ", e.target.className);
    console.log("id = ", e.target.id);
    let s_arr;
    if (e.target.id) {
        s_arr = e.target.id.split("_");
    }
    if (s_arr.length < 3) {
        console.log("invalid leng");
        return;
    }
    // img_upig_12
    // img_prog_12
    curr_elem_id = e.target.id;

    if (s_arr[0] == "img" && s_arr[1] == "upig") {
        curr_file_id = curr_file_id = s_arr[0] + "_prog_" + s_arr[2];
        curr_file_type = "img";
        input_up_file.click();
        console.log(" curr_file_id " + curr_file_id + " curr_file_type " + curr_file_type)
    }
    //    img_upts_1
    else if (s_arr[0] == "img" && s_arr[1] == "upts") {
        curr_file_id = s_arr[0] + "_prog_" + s_arr[2];
        curr_file_type = "img_txt";
        input_up_file.click();
        console.log("curr_file_id " + curr_file_id + " curr_file_type " + curr_file_type)
    }
    //img_crad_0
    else if (s_arr[0] == "img" && s_arr[1] == "crad") {

        // console.log(   )
        let curr_elem = document.getElementById(curr_elem_id);
        curr_elem.textContent = "Creating ...";
        send_ajax(`f_id=${curr_elem_id}`, "/txt_to_voice", "post")
            .then((data) => {
                let res_data = JSON.parse(data);
                console.log(res_data);
                window.open(res_data.link, "_blank");
                // window.open("./cook","_blank");
                curr_elem.textContent = "Create Audio";
            }).catch(error => {
                console.log((error));
                curr_elem.textContent = "Create Audio";
            });
    }


    // img_mgia_0
    else if (s_arr[0] == "img" && s_arr[1] == "mgia") {

        // console.log(   )

        // file_ext_upig

        let curr_elem_for_att = document.getElementById(`${s_arr[0]}_impv_${s_arr[2]}`);
        let f_ext = curr_elem_for_att.getAttribute("file_ext_upig")
        if (!(f_ext)) {
            console.log("img att for image file not found ");
            return;
        }



        let curr_elem = document.getElementById(curr_elem_id);

        if (curr_elem.textContent == "Merging ...") {
            console.log("already in progress ");
            return;
        }
        curr_elem.textContent = "Merging ...";


        send_ajax(`f_id=${curr_elem_id}&f_ext=${f_ext}`, "/merge_img_aud", "post")
            .then((data) => {
                let res_data = JSON.parse(data);
                console.log(res_data);
                // window.open( "." + (location.pathname) +  res_data.link,"_blank");
                video_player.src = null;
                video_player.src = "." + (location.pathname) + res_data.link;
                img_close_modal_but.click();
                console.log("." + (location.pathname) + res_data.link, "_blank");
                // window.open("./cook","_blank");
                // ##
                curr_elem.textContent = "Merge Image+Audio";
            }).catch(error => {
                console.log((error));
                curr_elem.textContent = "Merge Image+Audio";
            });
    }






});


vid_item.addEventListener("click", (e) => {

    console.log("class = ", e.target.className);
    console.log("id = ", e.target.id);
    let s_arr;
    if (e.target.id) {
        s_arr = e.target.id.split("_");
    }
    if (s_arr.length < 3) {
        console.log("invalid leng");
        return;
    }
    // vid_upvd_1
    //vid_prog_0
    curr_elem_id = e.target.id;
    if (s_arr[0] == "vid" && s_arr[1] == "upvd") {
        curr_file_id = s_arr[0] + "_prog_" + s_arr[2];
        curr_file_type = "vid";
        console.log(" curr_file_id " + curr_file_id + " curr_file_type " + curr_file_type)
        input_up_file.click();

    }
    // vid_upts_0

    else if (s_arr[0] == "vid" && s_arr[1] == "upts") {

        curr_file_id = s_arr[0] + "_prog_" + s_arr[2];
        curr_file_type = "vid_txt";
        console.log(" curr_file_id " + curr_file_id + " curr_file_type " + curr_file_type)
        input_up_file.click();
    }

    else if (s_arr[0] == "vid" && s_arr[1] == "crad") {

        // console.log(   )
        let curr_elem = document.getElementById(curr_elem_id);
        curr_elem.textContent = "Creating ...";
        send_ajax(`f_id=${curr_elem_id}`, "/txt_to_voice", "post")
            .then((data) => {
                let res_data = JSON.parse(data);
                console.log(res_data);
                window.open(res_data.link, "_blank");
                // window.open("./cook","_blank");
                curr_elem.textContent = "Create Audio";

            }).catch(error => {
                console.log((error));
                curr_elem.textContent = "Create Audio";
            });
    }


    // vid_mgva_0
    else if (s_arr[0] == "vid" && s_arr[1] == "mgva") {

        // console.log(   )

        ///file_ext_upvd
        let curr_elem_for_att = document.getElementById(`${s_arr[0]}_impv_${s_arr[2]}`);
        let f_ext = curr_elem_for_att.getAttribute("file_ext_upvd")
        if (!(f_ext)) {
            console.log("img att for image file not found ");
            return;
        }



        let curr_elem = document.getElementById(curr_elem_id);

        if (curr_elem.textContent != "Merge Video+Audio") {
            console.log(" file already  in progress ");
            return;
        }
        curr_elem.textContent = "Merging ...";


        send_ajax(`f_id=${curr_elem_id}&f_ext=${f_ext}`, "/merge_vid_aud", "post")
            .then((data) => {
                let res_data = JSON.parse(data);
                console.log(res_data);
                // window.open(res_data.link,"_blank");
                video_player.src = null;
                video_player.src = "." + (location.pathname) + res_data.link;
                img_close_modal_but.click();
                // window.open("./cook","_blank");
                curr_elem.textContent = "Merge Video+Audio";
            }).catch(error => {
                console.log((error));
                curr_elem.textContent = "Merge Video+Audio";
            });
    }



});


merge_all.addEventListener("click", (e) => {

    console.log("class = ", e.target.className);
    console.log("id = ", e.target.id);

    let img_c = img_item.childElementCount;
    let vid_c = vid_item.childElementCount;
    //    img_item.children[i].firstElementChild
    //  console.log( img_c, vid_c); 
    //   if( img_c >0 || vid_c >0 ) {
    //     merge_all.textContent = "Merging ..." ;  
    //   }
    //   img_item.children[0].firstElementChild.id
    for (let i = 0; i < img_c; i++) {

        let att_value = img_item.children[i].firstElementChild.getAttribute("file_ext_upig");
        let f_id = img_item.children[i].firstElementChild.id;
        if (att_value == "jpeg" || att_value == "png" || att_value == "jpg") {
            merge_all.textContent = "Merging ...";
            converting_file_count++;
            converting_file_id_table[f_id] = true;
            console.log("sened req  img id =", i, " conv file co = ", converting_file_count)
            console.log(converting_file_id_table);
            send_ajax(`f_f_type=img&f_id=${f_id}`, "/conv_mp4_ts", "post")
                .then((data) => {
                    converting_file_count--;
                    let res_data = JSON.parse(data);
                    console.log(res_data);
                    // window.open(res_data.link,"_blank");
                    // window.open("./cook","_blank");
                    if (converting_file_count == 0) {
                        // merge_all.textContent = "Merge All" ; 

                        let vid_file_ts_id_arr = Object.keys(converting_file_id_table)
                        let vid_file_str = JSON.stringify(vid_file_ts_id_arr);
                        console.log(vid_file_ts_id_arr);
                        console.log(vid_file_str);


                        send_ajax(`data=${vid_file_str}`, "/merge_all", "post")
                            .then((data) => {
                                let res_data = JSON.parse(data);
                                console.log(res_data);
                                //  window.open(res_data.link,"_blank");
                                // window.open("/down/" + res_data.link, "_blank");
                                merge_all.textContent = "Merge All";
                               let curr_link_elem =     document.createElement("a"); 
                               curr_link_elem.href = "/down/" + res_data.link; 
                               curr_link_elem.click(); 

                                //   let  link_elem = document.createElement("a"); 
                                //   link_elem.href="/down/"+res_data.link; 
                                //   link_elem.click(); 

                            }).catch(error => {
                                console.log((error));
                                merge_all.textContent = "Merge All";
                            });



                    }
                }).catch(error => {
                    converting_file_count--;
                    delete converting_file_id_table[f_id];
                    console.log((error));
                    if (converting_file_count == 0) {
                        merge_all.textContent = "Merge All";

                    }
                });

        }
    }


    //   vid_item.children[0].firstElementChild.getAttribute("file_ext_upvd"); 
    for (let i = 0; i < vid_c; i++) {

        let att_value = vid_item.children[i].firstElementChild.getAttribute("file_ext_upvd");
        let f_id = vid_item.children[i].firstElementChild.id;
        if (att_value == "mp4") {
            merge_all.textContent = "Merging ...";
            // console.log( "sened req  vid id =",i)
            converting_file_count++;
            converting_file_id_table[f_id] = true;
            console.log("sened req  img id =", i, " conv file co = ", converting_file_count)
            send_ajax(`f_f_type=vid&f_id=${f_id}`, "/conv_mp4_ts", "post")
                .then((data) => {
                    converting_file_count--;
                    let res_data = JSON.parse(data);
                    console.log(res_data);
                    // window.open(res_data.link,"_blank");
                    // window.open("./cook","_blank");
                    if (converting_file_count == 0) {
                        // merge_all.textContent = "Merge All" ; 

                        let vid_file_ts_id_arr = Object.keys(converting_file_id_table)
                        let vid_file_str = JSON.stringify(vid_file_ts_id_arr);
                        console.log(vid_file_ts_id_arr);
                        console.log(vid_file_str);


                        send_ajax(`data=${vid_file_str}`, "/merge_all", "post")
                            .then((data) => {
                                let res_data = JSON.parse(data);
                                console.log(res_data);
                                //    window.open(res_data.link,"_blank");
                                window.open("/down/" + res_data.link, "_blank");
                                merge_all.textContent = "Merge All";

                                //    let  link_elem = document.createElement("a"); 
                                //    link_elem.href="/down/"+res_data.link; 
                                //    link_elem.click(); 
                            }).catch(error => {
                                console.log((error));
                                merge_all.textContent = "Merge All";
                            });







                    }
                }).catch(error => {
                    converting_file_count--;
                    delete converting_file_id_table[f_id];
                    console.log((error));
                    if (converting_file_count == 0) {
                        merge_all.textContent = "Merge All";

                    }
                });

        }
    }




    //  send_ajax( `img_c=${img_c}&vid_c=${vid_c}`, "/merge_all", "post")
    //      .then((data) => {
    //        let  res_data= JSON.parse(data); 
    //          console.log(res_data);
    //          window.open(res_data.link,"_blank");
    //          // window.open("./cook","_blank");
    //          merge_all.textContent = "Merge All" ; 
    //      }).catch(error => {
    //          console.log((error));
    //          merge_all.textContent = "Merge All" ; 
    //      });

});

clear_all.addEventListener("click", (e) => {
      window.location.href=location.href; 
}); 
function send_file_to_server(file, prog_id, f_type, target_id) {

    let file_type;

    console.log(arguments);
    console.log(file[0].type);
    if (f_type == "img" && (file[0].type != "image/jpeg" && file[0].type != "image/png")) {
        console.log(" not match file type img ");

        input_up_file.value = null;
        return;
    } else if (f_type == "vid" && (file[0].type != "video/mp4")) {
        console.log(" not match file type  vid");
        input_up_file.value = null;
        return;
    } else if ((f_type == "vid_txt" || f_type == "img_txt") && (file[0].type != "text/plain")) {
        console.log(" not match file type  text");
        input_up_file.value = null;
        return;
    }









    let s_arr = target_id.split("_");;
    let curr_elem_for_att = document.getElementById(`${s_arr[0]}_impv_${s_arr[2]}`)
    let ext_s_arr = file[0].name.split(".");
    curr_elem_for_att.setAttribute("file_ext_" + s_arr[1], ext_s_arr[ext_s_arr.length - 1]);
    console.log("setting att ", curr_elem_for_att.getAttribute("file_ext_" + s_arr[1]));









    let xhttp = new XMLHttpRequest();



    // let url = `/up`;
    let url = `/upload?f_id=${prog_id}`;

    // let url = `/upload/${prog_id}`;
    console.log("url = ", url);
    xhttp.open("POST", url, true);

    let prog_bar = document.getElementById(prog_id);
    let target_elem = document.getElementById(target_id);
    let prev_text = target_elem.textContent;
    console.log(prog_bar, prog_id, target_elem, target_id)
    // return; 
    let form_data = new FormData();
    form_data.append("upload_file", file[0]);
    // form_data.append("f_id", "thsi is fidfrt"); 
    //  prog_bar.style.display="block"; 
    prog_bar.style.visibility = "visible";


    input_up_file.value = null;

    //  xhttp.setRequestHeader("Content-Type", "multipart/form-data");

    // xhttp.setRequestHeader("Content-type", "ap");\

    //  xhttp.setRequestHeader("Content-Type", "multipart/form-data");
    //  xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    // xhttp.setRequestHeader('Content-Type', 'multipart/form-data');
    xhttp.setRequestHeader('Accept', 'multipart/form-data')

    xhttp.upload.onprogress = function (e) {


        let frac = e.loaded / e.total;
        console.log(e.loaded);

        prog_bar.firstElementChild.style.width = Math.round(frac * 100) + "%";

    }
    // let vid_impv_0 =  document.getElementById("vid_impv_0")
    //  vid_impv_0.style.backgroundImage ="url('public/upload/1524e7f7-5206-471e-88ba-a060e9ee8e04/img_prog_0.jpg')"; 
    xhttp.onreadystatechange = function () {



        if (this.readyState == 4) {


            console.log("resrpn->", this.response);

            if (this.status >= 200 && this.status < 300) {
                let res_data = JSON.parse(this.response);
                target_elem.textContent = "Uploaded";
                setTimeout(() => {
                    target_elem.textContent = prev_text;
                }, 2000);

                if (res_data.status == "ok") {


                    console.log("----------------");

                    console.log(f_type, target_id);
                    if (f_type == "img" || f_type == "vid") {
                        let curr_img_elem_arr = target_id.split("_");

                        //  console.log(curr_img_elem_id); 
                        let curr_img_elem_id = document.getElementById(curr_img_elem_arr[0] + "_impv_" + curr_img_elem_arr[2]);
                        console.log(curr_img_elem_id);
                        //   524e7f7-5206-471e-88ba-a060e9ee8e04/img_prog_0.jpg
                        curr_img_elem_id.style.backgroundImage = "url('public/upload/" + res_data.file_link + "')";

                    }

                }
                else {
                    console.log(res_data.error);
                }

            } else {

            }
            // let res_data;
            // let res_data = JSON.parse(this.response);
            // console.log("resrpn->",res_data );

            // if (res_data.status == "ok") {

            // }
            // else {
            //       console.log(res_data.error);
            // }

            //  upload_img_but.innerHTML ="Upload"; 
            prog_bar.style.visibility = "hidden";
            prog_bar.firstElementChild.style.width = "0%";


            file = null;

        }
    }
    target_elem.textContent = "Uploading..."
    xhttp.send(form_data);

}


input_up_file.addEventListener("change", (e) => {

    // console.log("upload file  = " , e.target.File); 
    console.log("id = ", e.target.files);

    send_file_to_server(e.target.files, curr_file_id, curr_file_type, curr_elem_id);


});
