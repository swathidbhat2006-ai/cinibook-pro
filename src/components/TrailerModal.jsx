function TrailerModal({

  show,
  setShow,
  trailer,

}) {

  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-black/80 flex justify-center items-center z-50 px-5">

      {/* Modal */}
      <div className="relative w-full max-w-4xl">

        {/* Close Button */}
        <button
          onClick={() => setShow(false)}
          className="absolute -top-14 right-0 bg-red-600 px-5 py-2 rounded-lg hover:bg-red-700 transition"
        >
          ✖ Close
        </button>

        {/* Trailer */}
        <div className="aspect-video rounded-2xl overflow-hidden shadow-2xl">

          <iframe
            width="100%"
            height="100%"
            src={trailer}
            title="Movie Trailer"
            allowFullScreen
          ></iframe>

        </div>

      </div>

    </div>
  );
}

export default TrailerModal;