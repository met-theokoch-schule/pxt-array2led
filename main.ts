/**
 * Well known colors for a NeoPixel strip
 */
namespace Farben {
    export let ROT = "FF0000";
    export let ORANGE = "FF8000";
    export let GELB = "FFFF00";
    export let GRUEN = "00FF00";
    export let TUERKIS = "00FFFF";
    export let BLAU = "0000FF";
    export let MAGENTA = "FF00FF";
    export let ROSA = "FF0080";
    export let WEISS = "FFFFFF";
    export let GRAU = "909090";
    export let DUNKELGRAU = "505050";
    export let SCHWARZ = "000000";
}

namespace LedMatrix {

    let size = 8;

    let strip = neopixel.create(DigitalPin.C8, 64, NeoPixelMode.RGB)

    function byteToHex(n: number) {
        const hexChars = "0123456789ABCDEF";
        const high = Math.floor(n / 16);
        const low = n % 16;
        return hexChars.charAt(high) + hexChars.charAt(low);
    }

    function hexStringToNumber(hexString: string) {
        let result = 0;
        for (let i = 0; i < 6; i++) {
            const digit = hexString.charCodeAt(i);
            let value;
            if (digit >= 48 && digit <= 57) {         // '0'–'9'
                value = digit - 48;
            } else if (digit >= 65 && digit <= 70) {  // 'A'–'F'
                value = digit - 55;
            } else if (digit >= 97 && digit <= 102) { // 'a'–'f'
                value = digit - 87;
            } else {
                value = 0; // Fallback für ungültige Zeichen
            }
            result = result * 16 + value;
        }
        return result;
    }

    function grayHexNumber(value: number) {
        // Auf gültigen Bereich runden und begrenzen
        let v = Math.round(value);
        if (v < 0) v = 0;
        if (v > 255) v = 255;

        // Drei identische Bytes für Grau zusammenbauen
        const h = byteToHex(v);
        const hexString = h + h + h;

        // Manuell in Zahl umwandeln (hex zu dezimal)
        return hexStringToNumber(hexString)
    }

    export function show(array: any[]) {
        if (array.length == 25) {
            let leds = ``
            for (let index = 0; index < 25; index++) {
                if (typeof array[index] == "number") {
                    // Auf gültigen Bereich runden und begrenzen
                    let w = Math.round(array[index]);
                    if (w < 0) w = 0;
                    if (w > 255) w = 255;
                    led.plotBrightness(Math.floor(index / 5), index % 5, w)
                } else if (typeof array[index] == "string") {
                    led.plotBrightness(Math.floor(index / 5), index % 5, 0)
                }
            }
        } else if (array.length == 64) {
            strip.setBrightness(20);
            for (let index2 = 0; index2 < 64; index2++) {
                if (typeof array[index2] == "number") {
                    strip.setPixelColor(index2, grayHexNumber(array[index2]))
                } else if (typeof array[index2] == "string") {
                    strip.setPixelColor(index2, hexStringToNumber(array[index2]))
                }
            }
            strip.show()
        } else {
            basic.showString("Arraygröße nicht unterstützt!")
        }
    }

    export function showBlack() {
        strip.showColor(neopixel.colors(NeoPixelColors.Black))
        strip.show()
    }

}
LedMatrix.showBlack()