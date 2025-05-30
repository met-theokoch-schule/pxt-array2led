

namespace ledmatrix {
    let ccolors = [0xff0000, 0xFF7F00, 0xFFFE00, 0x7FFF00, 0x00FF00, 0x00FF7F,
        0x00FFFE, 0x0040FF, 0x0000FF, 0x6000FF, 0xFE00FF, 0xFF0040]
    
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
            if (digit >= 48 && digit <= 57) {        // '0'-'9'
                value = digit - 48;
            } else if (digit >= 65 && digit <= 70) { // 'A'-'F'
                value = digit - 55;
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

    //% blockId=LedMatrixShow block="show array on leds"
    //% block.loc.de="zeige Array auf LEDs"
    export function show(array: any[]) {
        if (array.length < 64) {
            for (let index = 0; index < 25; index++) {

            }
        } else {
            for (let index = 0; index < 64; index++) {
                if (typeof array[index] == "number") {
                    strip.setPixelColor(index, grayHexNumber(array[index]))
                } else if (typeof array[index] == "string") {
                    strip.setPixelColor(index, hexStringToNumber(array[index]))
                }
            }
            strip.show()
        }
    }

    export function showBlack() {
        strip.showColor(neopixel.colors(NeoPixelColors.Black))
        strip.show()
    }

}

ledmatrix.showBlack()

basic.forever(function () {
})
