export const formatearFecha = (fechaISO: string) => {
    const fecha = new Date(fechaISO);
    const dia = String(fecha.getDate()).padStart(2, '0');
    const mes = String(fecha.getMonth() + 1).padStart(2, '0');
    const año = fecha.getFullYear();

    let horas = fecha.getHours();
    const minutos = String(fecha.getMinutes()).padStart(2, '0');
    const ampm = horas >= 12 ? 'pm' : 'am';

    horas = horas % 12;
    horas = horas ? horas : 12; // La hora 0 se convierte a 12

    return `${dia}/${mes}/${año} - ${horas}:${minutos} ${ampm}`;
}

export const getTiempoRelativo = (fechaISO: string) => {
    const fecha = new Date(fechaISO);
    const ahora = new Date();
    const diferenciaMs = (ahora as any) - (fecha as any);
    const diferenciaMinutos = Math.floor(diferenciaMs / (1000 * 60));
    const diferenciaHoras = Math.floor(diferenciaMs / (1000 * 60 * 60));
    const diferenciaDias = Math.floor(diferenciaMs / (1000 * 60 * 60 * 24));

    if (diferenciaMinutos < 1) return "Hace unos segundos";
    if (diferenciaMinutos < 60) return `Hace ${diferenciaMinutos} minutos`;
    if (diferenciaHoras < 24 && ahora.toDateString() === fecha.toDateString()) return `Hace ${diferenciaHoras} horas`;

    if (diferenciaDias === 1) return "Ayer";
    if (diferenciaDias === 2) return "Anteayer";
    if (diferenciaDias < 7) return `Hace ${diferenciaDias} días`;

    return fecha.toLocaleDateString(); // Devuelve la fecha en formato estándar si es más antigua
};

export const formatearFechaISO = (fecha: Date) => {
    const año = fecha.getFullYear();
    const mes = String(fecha.getMonth() + 1).padStart(2, '0');
    const dia = String(fecha.getDate()).padStart(2, '0');
    const horas = String(fecha.getHours()).padStart(2, '0');
    const minutos = String(fecha.getMinutes()).padStart(2, '0');
    const segundos = String(fecha.getSeconds()).padStart(2, '0');
    const milisegundos = String(fecha.getMilliseconds()).padStart(3, '0');

    return `${año}-${mes}-${dia}T${horas}:${minutos}:${segundos}.${milisegundos}`;
};