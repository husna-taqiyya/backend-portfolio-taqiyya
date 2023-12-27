export const notFound = (req, res) => {
    res.status(404).json({
        messege: "Halaman tidak di temukan"
    });
};