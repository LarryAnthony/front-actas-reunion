const customInitFunction = () => {
    jQuery(function () {
        $('#nuevoUsuario').on('click', function () {
            if ($('#ingresarUsuario').hasClass('d-none') === true) {
                $('#ingresarUsuario').removeClass('d-none');
            } else {
                $('#ingresarUsuario').addClass('d-none');
            }
        });

        $('#nuevoAcuerdo').on('click', function () {
            if ($('#ingresarAcuerdo').hasClass('d-none') === true) {
                $('#ingresarAcuerdo').removeClass('d-none');
            } else {
                $('#ingresarAcuerdo').addClass('d-none');
            }
        });
    });
}
customInitFunction();