const customInitFunction = () => {
    jQuery(function () {
        $('#nuevoUsuario').on('click', function () {
            $('#ingresarUsuario').slideToggle('slow');
            if ($(this).hasClass('fa-user-plus')) {
                $(this).removeClass('fa-user-plus').addClass('fa-user-minus');
            } else {
                $(this).removeClass('fa-user-minus').addClass('fa-user-plus');
            }
        });

        $('#nuevoAcuerdo').on('click', function () {
            $('#ingresarAcuerdo').slideToggle('slow');
            if ($(this).hasClass('fa-plus')) {
                $(this).removeClass('fa-plus').addClass('fa-minus');
            } else {
                $(this).removeClass('fa-minus').addClass('fa-plus');
            }
        });
        $('.lateral-icon').on('click', function () {
            $('#integrantes').slideToggle('slow', function () {
                if ($('.lateral-icon').children('i').hasClass('fa-chevron-down')) {
                    $('.lateral-icon').children('i').removeClass('fa-chevron-down');
                    $('.lateral-icon').children('i').addClass('fa-chevron-up');
                    $('#acuerdo').addClass('col-md-7 col-lg-8');

                } else {
                    $('.lateral-icon').children('i').removeClass('fa-chevron-up');
                    $('.lateral-icon').children('i').addClass('fa-chevron-down');
                    $('#acuerdo').removeClass('col-md-7 col-lg-8');
                }
            });
        });
    });
}
customInitFunction();