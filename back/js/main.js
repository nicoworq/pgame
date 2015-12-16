

function eliminarParticipante(idParticipante) {

    if (!confirm('Seguro?')) {
        return false;
    }


    $.post('php/ajaxEliminar.php', {idParticipante: idParticipante}, function (data) {

        if (data.eliminado) {
            alert('OK!');
            window.location.reload()
        } else {
            alert('ERROR !');
        }

    });
}
