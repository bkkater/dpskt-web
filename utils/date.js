import { formatDistanceStrict } from "date-fns";
import { ptBR } from "date-fns/locale";

export function formatDistinct(minutes) {
  if (minutes > 60) {
    const hour = parseInt(minutes / 60, 10);
    const min = minutes % 60;

    if (min > 0) {
      return `${hour}h ${min}min`;
    }

    return `${hour} horas`;
  }

  if (minutes < 1) {
    return "Alguns segundos";
  }

  return `${minutes} minutos`;
}

export function getDistance(start, end) {
  const minutes = formatDistanceStrict(start, end, {
    locale: ptBR,
    unit: "minute",
  }).split(" ")[0];

  return formatDistinct(minutes);
}

export const dateFormat = "HH:mm · dd MMM yy";
