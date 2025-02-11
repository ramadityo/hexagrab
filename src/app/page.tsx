import ColorBox from "@/components/ColorBox";
import UploadBox from "@/components/UploadBox";
import Image from "next/image";

export default function Home() {
    return (
        <div className="w-full h-screen overflow-hidden flex items-center justify-center">
            <div className="w-max">
                <UploadBox />
                <ColorBox />
            </div>
        </div>
    );
}
