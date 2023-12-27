// PATH: METHOD POST UNTUK LOGIN
const login = (req, res) => {
    // CARA UNTUK KIRIM COOKIE KE CLIENT/BROWSER
    res.cookie("token", "abcdefghijklmnopqrstuvwxyz");
    res.cookie("username", "husnataqiyya");
    res.cookie("lokasi", "jakarta");

    res.status(200).json({
        messege: "Anda berhasil login"
    });
}


const logout = (req, res) => {
    res.clearCookie('lokasi');
    res.clearCookie('username');
    res.clearCookie('token');

    res.status(200).json({
        messege: "Semua data di cookie berhasil di hapus"
    });
}

export default {
    login,
    logout
}