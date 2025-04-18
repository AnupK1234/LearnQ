
export default function VideoBox(props) {
    return (
        <div className="aspect-video flex rounded-sm overflow-hidden items-center h-[350px] w-[350px] justify-center bg-simligray">
            <video ref={props.video} autoPlay playsInline></video>
            <audio ref={props.audio} autoPlay ></audio>
        </div>
    );
}