const ContentModal = ({ isVisible, onClose, props }) => {
    if (!isVisible) return null;
    return (
        <div className="fixed inset-0 flex items-center justify-center z-10">
            <div className="bg-black bg-opacity-50 absolute inset-0" onClick={onClose}></div>
            <div className="bg-white p-6 rounded shadow-lg relative h-[50vh] w-[40vw]">
                <button onClick={onClose} className="absolute top-2 right-2 text-xl">&times;</button>
                {props}
            </div>
        </div>
    );
}

export default ContentModal;
