const ContentModal = ({ isVisible, onClose, props }) => {
    if (!isVisible) return null;
    return (
        <div className="fixed inset-0 flex rounded-lg items-center justify-center bg-black bg-opacity-50 z-10" style={{pointerEvents: 'auto'}}>
            <div className="bg-white p-6 rounded shadow-lg relative h-[50vh] w-[40vw]">
                <button onClick={onClose} className="absolute top-2 right-2 text-xl">&times;</button>
                {props}
            </div>
            <div className="fixed inset-0" style={{pointerEvents: 'none'}}></div>
        </div>
    );
}

export default ContentModal;