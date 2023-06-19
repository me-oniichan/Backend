import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import Loading from "./Components/Loading";

const Home = () => {
    const drop = useRef();
    const img = useRef();
    const file = useRef(null);
    const selector = useRef();
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();


    const preventDefaultBehaviour = (e) => {
        e.preventDefault();
        e.stopPropagation();
    };

    const handledrop = (e) => {
        drop.current.classList.remove("highlight");
        const { files } = e.dataTransfer;
        if (files.length && files[0].type.includes("image")) {
            file.current = files[0];
            previewImg();
        }
    };

    const previewImg = () => {
        const reader = new FileReader();
        reader.readAsDataURL(file.current);
        reader.onload = () => {
            img.current.src = reader.result;
            resize()
        };
    };

    const chooseImg = () => {
        const files = selector.current.files;
        if (files.length && files[0].type.includes("image")) {
            file.current = files[0];
            previewImg();
        }
    };

    function dataURLtoFile(dataurl, filename) {
        var arr = dataurl.split(','),
            mime = arr[0].match(/:(.*?);/)[1],
            bstr = atob(arr[arr.length - 1]), 
            n = bstr.length, 
            u8arr = new Uint8Array(n);
        while(n--){
            u8arr[n] = bstr.charCodeAt(n);
        }
        return new File([u8arr], filename, {type:mime});
    }

    const resize= async ()=>{
        let image = new Image();
        image.src = img.current.src;
        image.onload = ()=>{
            let canvas = document.createElement("canvas");
            canvas.width= 224
            canvas.height= 224
            let ctx = canvas.getContext("2d");
            ctx.drawImage(image, 0, 0, 224, 224);
            file.current = dataURLtoFile(canvas.toDataURL(), "image")
        }
    }

    const upload = async () => {
        if (file.current == null) return;
        setLoading(true);
        const formdata = new FormData();
        formdata.append("image", file.current);

        fetch("/classify", {
            method: "POST",
            body: formdata,
        }).then(async(res)=>{
            const {id} = await res.json()
            navigate("/"+id);
            setLoading(false);
        });

    };

    useEffect(() => {
        if(loading) return;
        const element = drop.current;
        element.addEventListener("dragover", (e) => {
            preventDefaultBehaviour(e);
            element.classList.add("highlight");
        });

        element.addEventListener("drop", (e) => {
            preventDefaultBehaviour(e);
            handledrop(e);
        });

        element.addEventListener("dragleave", (e) => {
            preventDefaultBehaviour(e);
            element.classList.remove("highlight");
        });
    });

    if(loading) return <Loading />
    return (
        <div className="home">
            <div className="container unhighlight" ref={drop}>
                <img
                    src="data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%22555%22%20height%3D%22555%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20555%20555%22%20preserveAspectRatio%3D%22none%22%3E%0A%20%20%20%20%20%20%3Cdefs%3E%0A%20%20%20%20%20%20%20%20%3Cstyle%20type%3D%22text%2Fcss%22%3E%0A%20%20%20%20%20%20%20%20%20%20%23holder%20text%20%7B%0A%20%20%20%20%20%20%20%20%20%20%20%20fill%3A%20%23aaaaaa%3B%0A%20%20%20%20%20%20%20%20%20%20%20%20font-family%3A%20Comic%20Sans%20MS%3B%0A%20%20%20%20%20%20%20%20%20%20%20%20font-size%3A%2050px%3B%0A%20%20%20%20%20%20%20%20%20%20%20%20font-weight%3A%20500%3B%0A%20%20%20%20%20%20%20%20%20%20%7D%0A%20%20%20%20%20%20%20%20%3C%2Fstyle%3E%0A%20%20%20%20%20%20%3C%2Fdefs%3E%0A%20%20%20%20%20%20%3Cg%20id%3D%22holder%22%3E%0A%20%20%20%20%20%20%20%20%3Crect%20width%3D%22100%25%22%20height%3D%22100%25%22%20fill%3D%22%23333333%22%3E%3C%2Frect%3E%0A%20%20%20%20%20%20%20%20%3Cg%3E%0A%20%20%20%20%20%20%20%20%20%20%3Ctext%20text-anchor%3D%22middle%22%20x%3D%2250%25%22%20y%3D%2250%25%22%20dy%3D%22.3em%22%3EChoose%2FDrop%20Image%3C%2Ftext%3E%0A%20%20%20%20%20%20%20%20%3C%2Fg%3E%0A%20%20%20%20%20%20%3C%2Fg%3E%0A%20%20%20%20%3C%2Fsvg%3E"
                    alt=""
                    ref={img}
                    draggable={false}
                    onClick={() => selector.current.click()}
                />
                <input name="file" type="file" accept="image/*" hidden ref={selector} onChange={chooseImg} />
                <button className="submit" onClick={upload}>
                    SUBMIT
                </button>
            </div>
        </div>
    );
};

export default Home;
