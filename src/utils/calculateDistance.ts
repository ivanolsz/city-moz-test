import { ICity } from '../contexts/types';

export const calculateDistance = (point1: ICity, point2: ICity) => {
    const gamma1 = point1.longitude;
    const fi1 = point1.latitude;
    const gamma2 = point2.longitude;
    const fi2 = point2.latitude;
    const r = 6378.137; // radius of earth km

    const deltaGamma = Math.abs(gamma1 - gamma2);
    const deltaFi = Math.abs(fi1 - fi2);
    const deltaSita =
        2 *
        Math.asin(
            Math.sqrt(
                Math.pow(Math.sin(deltaFi / 2), 2) +
                    (1 - Math.pow(Math.sin(deltaFi / 2), 2) - Math.pow(Math.sin((fi1 + fi2) / 2), 2)) *
                        Math.pow(Math.sin(deltaGamma / 2), 2)
            )
        );
    return r * deltaSita;
};
