$(document).ready(function () {
    $('.nav-trigger').click(function () {
        $('.side-nav').toggleClass('visible');
        $('.main-content').toggleClass('invisible');
        $('.user-nav').removeClass('visible')
    });
});

$(document).ready(function () {
    $('.user-trigger').click(function () {
        $('.user-nav').toggleClass('visible');
        $('.side-nav').removeClass('visible');
    });
});

/* ===================================================================
 * Custom - Main JS
 * ------------------------------------------------------------------- */
$(document).ready(function () {
    $('.myslider').slick({
        dots: true,
        infinite: true,
        speed: 700,
        autoplay: true,
        autoplaySpeed: 2000,
        arrows: false,
        slidesToShow: 4,
        slidesToScroll: 1,
        centerPadding: '60px',
        centerMode: true,
        responsive: [{
            breakpoint: 900,
            settings: {
                infinite: true,
                speed: 700,
                slidesToShow: 1,
                arrows: false,
            }
        }],
    });
});
// $(document).ready(function () {
// 	$('.myslider-1').slick({
// 		dots: true,
// 		infinite: true,
// 		speed: 700,
// 		autoplay: true,
// 		autoplaySpeed: 2000,
// 		arrows: false,
// 		slidesToShow: 1,
// 		slidesToScroll: 1,
// 		centerMode: false,
// 		rightPadding: '60px',
// 		variableWidth: true,
// 		responsive: [
// 			{
// 				breakpoint: 900,
// 				settings: {
// 					infinite: true,
// 					speed: 700,
// 					slidesToShow: 1,
// 					arrows: false,
// 					variableWidth: true,
// 				  }
// 			}
// 		],

// 	});
// });

function inputTerbilang() {
    //membuat inputan otomatis jadi mata uang
    $('.jumlah').mask('000.000.000.000.000', {
        reverse: true
    });

    //mengambil data uang yang akan dirubah jadi terbilang
    var input = document.getElementById("terbilang-input").value.replace(/\./g, "");

    //menampilkan hasil dari terbilang
    document.getElementById("terbilang-output").value = terbilang(input).replace(/  +/g, ' ');
}

function popup(url, height = 800, width = 600) {
    newwindow = window.open(url, 'name', 'height=' + height + ',width=' + width + '');
    if (window.focus) {
        newwindow.focus()
    }
    return false;
}

function terbilang(bilangan) {

    bilangan = String(bilangan);
    var angka = new Array('0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0');
    var kata = new Array('', 'Satu', 'Dua', 'Tiga', 'Empat', 'Lima', 'Enam', 'Tujuh', 'Delapan', 'Sembilan');
    var tingkat = new Array('', 'Ribu', 'Juta', 'Milyar', 'Triliun');

    var panjang_bilangan = bilangan.length;

    /* pengujian panjang bilangan */
    if (panjang_bilangan > 15) {
        kaLimat = "Diluar Batas";
        return kaLimat;
    }

    /* mengambil angka-angka yang ada dalam bilangan, dimasukkan ke dalam array */
    for (i = 1; i <= panjang_bilangan; i++) {
        angka[i] = bilangan.substr(-(i), 1);
    }

    i = 1;
    j = 0;
    kaLimat = "";


    /* mulai proses iterasi terhadap array angka */
    while (i <= panjang_bilangan) {

        subkaLimat = "";
        kata1 = "";
        kata2 = "";
        kata3 = "";

        /* untuk Ratusan */
        if (angka[i + 2] != "0") {
            if (angka[i + 2] == "1") {
                kata1 = "Seratus";
            } else {
                kata1 = kata[angka[i + 2]] + " Ratus";
            }
        }

        /* untuk Puluhan atau Belasan */
        if (angka[i + 1] != "0") {
            if (angka[i + 1] == "1") {
                if (angka[i] == "0") {
                    kata2 = "Sepuluh";
                } else if (angka[i] == "1") {
                    kata2 = "Sebelas";
                } else {
                    kata2 = kata[angka[i]] + " Belas";
                }
            } else {
                kata2 = kata[angka[i + 1]] + " Puluh";
            }
        }

        /* untuk Satuan */
        if (angka[i] != "0") {
            if (angka[i + 1] != "1") {
                kata3 = kata[angka[i]];
            }
        }

        /* pengujian angka apakah tidak nol semua, lalu ditambahkan tingkat */
        if ((angka[i] != "0") || (angka[i + 1] != "0") || (angka[i + 2] != "0")) {
            subkaLimat = kata1 + " " + kata2 + " " + kata3 + " " + tingkat[j] + " ";
        }

        /* gabungkan variabe sub kaLimat (untuk Satu blok 3 angka) ke variabel kaLimat */
        kaLimat = subkaLimat + kaLimat;
        i = i + 3;
        j = j + 1;

    }

    /* mengganti Satu Ribu jadi Seribu jika diperlukan */
    if ((angka[5] == "0") && (angka[6] == "0")) {
        kaLimat = kaLimat.replace("Satu Ribu", "Seribu");
    }
    if (bilangan == '' || bilangan == 0) {
        return kaLimat;
    }
    return kaLimat + "Rupiah";
}

$(function () {
    $('#file-upload').on('change', function () {
        //get the file name
        var fullPath = $("#file-upload").val();
        var fileName = fullPath.replace(/^.*[\\\/]/, '');
        document.getElementById('isi-data-file').innerHTML = fileName;
    });
});

document.getElementById('terbilang-input').addEventListener('keyup', function (event) {
    var inputValue = event.target.value;
    inputValue = inputValue.replace(/^0+/, '');
    event.target.value = inputValue;
});
