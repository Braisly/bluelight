window.addEventListener("load", function (event) {

    getByid("medicalSpecialtyTag").onchange = function () {

        let disabledDiseaseDiv = document.getElementById("TagStyleDiv").querySelectorAll("div");
        // let disabledDiseaseDiv = document.querySelectorAll("[id^=diseaseSelectorTag]");
        disabledDiseaseDiv.forEach((elem) => {
            elem.hidden = true;
        });

        let enabledDiseaseDiv = document.querySelectorAll("div[id='" + this.value + "']");
        enabledDiseaseDiv.forEach((elem) => {
            elem.hidden = false;
        });
    }

    getByid("writeTAG").onclick = function () {
        if (imgInvalid(this)) return;
        cancelTools();
        openWriteTAG = !openWriteTAG;
        img2darkByClass("TAG", !openWriteTAG);
        this.src = openWriteTAG == true ? '../image/icon/black/tag_on.png' : '../image/icon/black/tag_off.png';
        if (openWriteTAG == true) {
            getByid('TagStyleDiv').style.display = '';
            set_BL_model('writeTAG');
        } else getByid('TagStyleDiv').style.display = 'none';
        displayMark(viewportNumber);
        if (openWriteTAG == true) return;

        function download(text, name, type) {
            let a = document.createElement('a');
            let file = new Blob([text], {
                type: type
            });
            a.href = window.URL.createObjectURL(file);
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

        set_TAG_context();
        if (ConfigLog.Xml2Dcm.enableXml2Dcm == true) {
            download2(String(get_TAG_context()), "" + CreateRandom(), 'text/plain');
        } else {
            download(String(get_TAG_context()), 'filename_TAG.xml', 'text/plain');
        }

        getByid('MouseOperation').click();
    }
});

var TAG_format =
    `<?xml version="1.0" encoding="UTF-8"?>
    <file-format>
        <meta-header xfer="1.2.840.10008.1.2.1" name="Little Endian Explicit">
            <element tag="0002,0013" vr="SH" vm="1" len="10" name="ImplementationVersionName">BlueLight</element>
        </meta-header>
        <data-set xfer="1.2.840.10008.1.2.1" name="Little Endian Explicit">
            <element tag="0004,1430" vr="CS" vm="1" len="6" name="DirectoryRecordType">IMAGE</element>
            <element tag="0041,1100" vr="TM" vm="1" len="14" name="ImageTag">___ImageTag___</element>
        </data-set>
    </file-format>
    `;


var TAG_format_object_list = [];

function set_TAG_context() {
    TAG_format_object_list = []
    let temp = "" + TAG_format;

    console.log("HOLITA")

    function setTag(temp, replace, str, len) {
        str = Null2Empty(str);
        str = "" + str;
        temp = temp.replace("___" + replace + "___", "" + str);
        var length = ("" + str).length;
        if (length % 2 != 0) length++;
        if (len == true) temp = temp.replace("___" + replace + "(len)___", length);
        return temp;
    }


    let selectedTag;
    let disabledDiseaseDivs = document.getElementById("TagStyleDiv").querySelectorAll("div");

    disabledDiseaseDivs.forEach((elem) => {
        if (elem.hidden === true) {
            //TODO Currently supported just only one disease
            let selector = elem.querySelectorAll("[id^=diseaseSelectorTag]")[0];
            selectedTag = selector.value;
        }
    });

    temp = setTag(temp, "ImageTag", selectedTag, true)
    TAG_format_object_list.push(temp);
}

function get_TAG_context() {
    var temp_str = "";
    for (var i = 0; i < TAG_format_object_list.length; i++) {
        temp_str += TAG_format_object_list[i];
    }
    return temp_str;
}