# Deviationtable
Creating deviation table from eight compass bearings.

* N     000°
* NE    045°
* E     090°
* SE    135°
* S     180°
* SW    225°
* W     270°
* NW    315°

Input gotten deviations to corresponding input fields with accidental and max one decimal.

Program calculates coefficients A,B,C,D ja E.

FORMULAS:
* A	=( eks1 + eks2 + eks3 + eks4 + eks5 + eks6 + eks7 + eks8 ) / 8
* B	=( eks2 + eks3 + eks4 - eks6 - eks7 - eks8 ) / ( 2 + 2 * SQUAREROOT(2) )
* C	=( eks1 + eks2 - eks4 - eks5 - eks6 + eks8 ) / ( 2 + 2 * SQUAREROOT(2) )
* D	=( eks2 - eks4 + eks6 - eks8 ) / 4
* E	=( eks1 - eks3 + eks5 - eks7 ) / 4

where eksX correspond input fields uo to down, eks1 ... eks8

deviations is calculated per direction by formula:
* eksymä = A + B * sin(KS) + C * cos(KS) + D * sin(2 * KS) + E * cos(2 * KS)

Where KS stands for compass bearing.

Deviation table and curve is printable.



# Eksymataulukko
Eksymätaulukon laatiminen 8 ilmansuunnan eksymistä.

* pohjoinen 000°
* koillinen 045°
* itä 090°
* kaakko 135°
* etelä 180°
* lounas 225°
* länsi 270°
* luode 315°

Syötä ilmansuuntien eksymät vastaaviin syöttökenttiin etumerkkeineen.
Max. yhdellä desimaalilla sekä käyttäen pistettä desimaalieroittimena.

Ohjelma laskee kertoimet A,B,C,D ja E.

KAAVOILLA:
* A	=( eks1 + eks2 + eks3 + eks4 + eks5 + eks6 + eks7 + eks8 ) / 8
* B	=( eks2 + eks3 + eks4 - eks6 - eks7 - eks8 ) / ( 2 + 2 * NELIÖJUURI(2) )
* C	=( eks1 + eks2 - eks4 - eks5 - eks6 + eks8 ) / ( 2 + 2 * NELIÖJUURI(2) )
* D	=( eks2 - eks4 + eks6 - eks8 ) / 4
* E	=( eks1 - eks3 + eks5 - eks7 ) / 4

jossa eksX vastaa syöttökenttiä ylhäältä alas, eks1 ... eks8

eksymät lasketaan per suunta kaavalla:
* eksymä = A + B * sin(KS) + C * cos(KS) + D * sin(2 * KS) + E * cos(2 * KS)

Jossa KS ajettu kompassisuunta.

Lasketun eksymätaulun ja eksymäkäyrän voi tulostaa.
