$(document).ready(function() {
    $('#btn-calculate').click(function() {
        var fname = $('#fname').val();
        var sname = $('#sname').val();

        if (fname === '' || sname === '') {
            Swal.fire({
                icon: 'error',
                title: 'Ups...',
                text: 'Silakan masukkan kedua nama terlebih dahulu!'
            });
        } else {
            // Memanggil fungsi untuk mengecek gender sebelum melanjutkan
            checkGender(fname, sname);
        }
    });
});

// Fungsi untuk mengecek gender
function checkGender(fname, sname) {
    // Memeriksa apakah nama sama
    if (fname.toLowerCase() === sname.toLowerCase()) {
        Swal.fire({
            icon: 'error',
            title: 'Ups...',
            text: `Nama ${fname} dan ${sname} adalah sama, jadi mereka merujuk pada orang yang sama!`
        });
        return; // Menghentikan eksekusi jika nama sama
    }

    $.ajax({
        url: "https://api.genderize.io/",
        type: "GET",
        data: { name: fname },
        success: function(res) {
            var firstNameGender = res.gender;

            $.ajax({
                url: "https://api.genderize.io/",
                type: "GET",
                data: { name: sname },
                success: function(res) {
                    var secondNameGender = res.gender;

                    // Memeriksa apakah gender berbeda
                    if (firstNameGender === secondNameGender) {
                        var genderMessage = firstNameGender === 'male' ? 'laki-laki' : 'perempuan';
                        Swal.fire({
                            icon: 'error',
                            title: 'Ups...',
                            text: `Nama ${fname} dan ${sname} sama-sama ${genderMessage}. Nama harus memiliki gender yang berbeda untuk menghitung kecocokan!`
                        });
                    } else {
                        // Melanjutkan ke perhitungan kecocokan
                        calculateCompatibility(fname, sname);
                    }
                }
            });
        }
    });
}

// Fungsi untuk menghitung kecocokan
function calculateCompatibility(fname, sname) {
    Swal.fire({
        title: "",
        text: "Sedang menghitung...",
        imageUrl: "https://c.tenor.com/I6kN-6X7nhAAAAAj/loading-buffering.gif",
        imageAlt: "Loading",
        showConfirmButton: false,
        allowOutsideClick: false,
    });

    $.ajax({
        url: 'https://love-calculator.p.rapidapi.com/getPercentage',
        method: 'GET',
        data: {
            fname: fname,
            sname: sname
        },
        headers: {
            'x-rapidapi-key': 'a6e4de61ddmsh3540c6b83345ec1p1ac2c5jsn941b5cddf9e8',
            'x-rapidapi-host': 'love-calculator.p.rapidapi.com'   
        },
        success: function(response) {
            var percentage = response.percentage;
            var resultText = `Cinta antara ${fname} dan ${sname} adalah ${percentage}%`;
            var info = ''; 
            var gifUrl = '';
    
            // Menentukan informasi berdasarkan persentase
            if (percentage >= 0 && percentage <= 20) {
                info = 'Kecocokan rendah. Ini mungkin menandakan bahwa Anda dan pasangan perlu lebih banyak komunikasi dan pengertian. Mungkin perlu usaha ekstra untuk saling memahami dan menemukan kesamaan. Jangan menyerah, setiap hubungan memerlukan usaha!';
                gifUrl = 'assets/low.gif';
            } else if (percentage > 20 && percentage <= 50) {
                info = 'Ada peluang, tetapi memerlukan kerja keras. Meskipun ada beberapa kesamaan, tantangan mungkin muncul. Ini adalah kesempatan bagus untuk saling mendukung dan tumbuh bersama. Jika Anda siap berkompromi dan berkolaborasi, hubungan ini bisa berkembang!';
                gifUrl = 'assets/medium1.gif';
            } else if (percentage > 50 && percentage <= 80) {
                info = 'Kecocokan yang baik. Ini menunjukkan bahwa ada banyak potensi untuk membangun hubungan yang kuat dan harmonis. Anda berdua tampaknya memiliki nilai dan tujuan yang sejalan. Teruskan komunikasi terbuka dan eksplorasi bersama untuk memperdalam koneksi ini!';
                gifUrl = 'assets/medium2.gif';
            } else {
                info = 'Kecocokan tinggi! Ini adalah tanda bahwa Anda memiliki banyak kesamaan dan saling melengkapi. Peluang untuk membangun hubungan yang bahagia dan memuaskan sangat besar. Manfaatkan momen ini untuk merayakan cinta dan kemitraan Anda yang kuat!';
                gifUrl = 'assets/high.gif';
            }                    

            resultText += `<br>${info}`;
    
            Swal.fire({
                title: 'Hasil Kecocokan',
                imageUrl: gifUrl,
                html: resultText,
                imageWidth: 150, 
                imageHeight: 150, 
            });
        },
        error: function() {
            Swal.fire({
                icon: 'error',
                title: 'Ups...',
                text: 'Terjadi kesalahan. Silakan coba lagi nanti.'
            });
        }
    });
}  
