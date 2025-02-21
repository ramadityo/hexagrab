import UploadBox from "@/components/UploadBox";
import Image from "next/image";
import ColorBox from "@/components/ColorBox";

export default function Home() {
    return (
        <div className="w-full h-screen md:overflow-hidden flex md:items-center justify-center">
            <div className="w-max  max-w-full p-6 h-max max-h-full text-center">
                <h1 className="text-5xl font-heading">HexaGrab</h1>
                <h2 className="text-xl mb-3 opacity-60 font-heading">Turn Images into Colors with One Upload</h2>
                <UploadBox />
                <ColorBox />
            </div>
        </div>
    );
}
