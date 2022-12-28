window.addEventListener("load", function (event) {

    getByid("writeTAG").onclick = function () {
        if (imgInvalid(this)) return;
        cancelTools();
        openWriteTAG = !openWriteTAG;
        img2darkByClass("TAG", !openWriteTAG);
        this.src = openWriteTAG == true ? '../image/icon/black/tag_on.png' : '../image/icon/black/tag_off.png';
        if (openWriteTAG == true) {
            getByid('TAGStyleDiv').style.display = '';
            // getByid('TAGStyleDiv').style.display = 'flex';
            set_BL_model('writeTAG');
            // @TODO DESCOMENTAR
            // writeTAG();
        }
        else getByid('TAGStyleDiv').style.display = 'none';
        displayMark(viewportNumber);
        if (openWriteTAG == true) return;
        // else TAG_now_choose = null;

        function download(text, name, type) {
            let a = document.createElement('a');
            let file = new Blob([text], {
                type: type
            });
            a.href = window.URL.createObjectURL(file);
            //a.style.display = '';
            a.download = name;
            a.click();
        }
        function download2(text, name, type) {
            let a = document.createElement('a');
            let file = new File([text], name + ".xml", {
                type: type
            });
            var xhr = new XMLHttpRequest();

            xhr.open('POST', ConfigLog.Xml2Dcm.Xml2DcmUrl, true);
            xhr.setRequestHeader("enctype", "multipart/form-data");
            // define new form
            var formData = new FormData();
            formData.append("files", file);
            xhr.send(formData);
            xhr.onload = function () {
                if (xhr.status == 200) {
                    let data = JSON.parse(xhr.responseText);
                    for (let url of data) {
                        window.open(url);
                    }
                }
            }
        }
       // set_TAG_context();
        if (ConfigLog.Xml2Dcm.enableXml2Dcm == true) download2(String(get_Graphic_context()), "" + CreateRandom(), 'text/plain');
        else download(String(get_Graphic_context()), 'filename_TAG.xml', 'text/plain');
        //download(String(get_Graphic_context()), 'filename_TAG.xml', 'text/plain');

        getByid('MouseOperation').click();
    }
});







function writeTAG() {

    // if (BL_mode == 'writeTAG') {
        // DeleteMouseEvent();
        // Mousedown = function (e) {
        //     if (e.which == 1) MouseDownCheck = true;
        //     else if (e.which == 3) rightMouseDown = true;
        //     var currX = getCurrPoint(e)[0];
        //     var currY = getCurrPoint(e)[1];
        //     windowMouseX = GetmouseX(e);
        //     windowMouseY = GetmouseY(e);
        //     GetViewport().originalPointX = getCurrPoint(e)[0];
        //     GetViewport().originalPointY = getCurrPoint(e)[1];
        //     if (xml_pounch(currX, currY) == true) displayMark();
        // };
        //
        // Mousemove = function (e) {
        //     var currX = getCurrPoint(e)[0];
        //     var currY = getCurrPoint(e)[1];
        //     var labelXY = getClass('labelXY'); {
        //         let angle2point = rotateCalculation(e);
        //         labelXY[viewportNumber].innerText = "X: " + parseInt(angle2point[0]) + " Y: " + parseInt(angle2point[1]);
        //     }
        //     if (rightMouseDown == true) {
        //         scale_size(e, currX, currY);
        //     }
        //
        //     if (openLink == true) {
        //         for (var i = 0; i < Viewport_Total; i++) {
        //             GetViewport(i).newMousePointX = GetViewport().newMousePointX;
        //             GetViewport(i).newMousePointY = GetViewport().newMousePointY;
        //         }
        //     }
        //     putLabel();
        //     for (var i = 0; i < Viewport_Total; i++)
        //         displayRular(i);
        //
        //     if (MouseDownCheck) {
        //         windowMouseX = GetmouseX(e);
        //         windowMouseY = GetmouseY(e);
        //         if (!xml_now_choose) {
        //             let Uid = SearchNowUid();
        //             var dcm = {};
        //             dcm.study = Uid.studyuid;
        //             dcm.series = Uid.sreiesuid;
        //             dcm.color = "#0000FF";
        //             dcm.mark = [];
        //             dcm.showName = "" + getByid("selectLabel").value;
        //             dcm.hideName = dcm.showName;
        //             dcm.mark.push({});
        //             dcm.sop = Uid.sopuid;
        //             var DcmMarkLength = dcm.mark.length - 1;
        //             dcm.mark[DcmMarkLength].type = "TAG_mark";
        //             dcm.mark[DcmMarkLength].markX = [];
        //             dcm.mark[DcmMarkLength].markY = [];
        //             dcm.mark[DcmMarkLength].markX.push(GetViewport().originalPointX);
        //             dcm.mark[DcmMarkLength].markY.push(GetViewport().originalPointY);
        //             dcm.mark[DcmMarkLength].markX.push(currX);
        //             dcm.mark[DcmMarkLength].markY.push(currY);
        //             PatientMark.push(dcm);
        //             refreshMark(dcm);
        //             for (var i = 0; i < Viewport_Total; i++)
        //                 displayMark(i);
        //             displayAngleRular();
        //             PatientMark.splice(PatientMark.indexOf(dcm), 1);
        //         } else {
        //             if (xml_now_choose.value == "up") {
        //                 xml_now_choose.mark.markY[0] = currY;
        //             } else if (xml_now_choose.value == "down") {
        //                 xml_now_choose.mark.markY[1] = currY;
        //             } else if (xml_now_choose.value == "left") {
        //                 xml_now_choose.mark.markX[0] = currX;
        //             } else if (xml_now_choose.value == "right") {
        //                 xml_now_choose.mark.markX[1] = currX;
        //             }
        //             for (var i = 0; i < Viewport_Total; i++)
        //                 displayMark(i);
        //
        //         }
        //     }
        // }
        // Mouseup = function (e) {
        //     var currX = getCurrPoint(e)[0];
        //     var currY = getCurrPoint(e)[1];
        //     MouseDownCheck = false;
        //     rightMouseDown = false;
        //     if (openWriteXML == true && !xml_now_choose) {
        //         let Uid = SearchNowUid();
        //         var dcm = {};
        //         dcm.study = Uid.studyuid;
        //         dcm.series = Uid.sreiesuid;
        //         dcm.color = "#0000FF";
        //         dcm.mark = [];
        //         dcm.showName = "" + getByid("selectLabel").value;
        //         dcm.hideName = dcm.showName;
        //         dcm.mark.push({});
        //         dcm.sop = Uid.sopuid;
        //         var DcmMarkLength = dcm.mark.length - 1;
        //         dcm.mark[DcmMarkLength].type = "TAG_mark";
        //         dcm.mark[DcmMarkLength].markX = [];
        //         dcm.mark[DcmMarkLength].markY = [];
        //         dcm.mark[DcmMarkLength].markX.push(GetViewport().originalPointX);
        //         dcm.mark[DcmMarkLength].markY.push(GetViewport().originalPointY);
        //         dcm.mark[DcmMarkLength].markX.push(currX);
        //         dcm.mark[DcmMarkLength].markY.push(currY);
        //         PatientMark.push(dcm);
        //         refreshMark(dcm);
        //         for (var i = 0; i < Viewport_Total; i++)
        //             displayMark(i);
        //         displayAngleRular();
        //         //setXml_context();
        //     }
        // }
    // }
    // AddMouseEvent();
}