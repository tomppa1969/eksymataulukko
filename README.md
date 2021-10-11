# Eksymataulukko
Eksymätaulukon laatiminen 8 ilmansuunnan eksymistä.

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

Lasketun eksymätaulun voi tulostaa.
