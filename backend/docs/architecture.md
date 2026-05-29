# Arhitektura backend dela

## Pregled

Backend je organizovan tako da svaka važna poslovna oblast ima jasno izdvojen modul. Na taj način sistem ostaje pregledan, lakši za održavanje i spreman za dalja proširenja.

Osnovna podela backend-a obuhvata:

- HTTP sloj
- aplikacioni sloj
- sloj pristupa podacima
- dokumentacioni sloj kroz Swagger

## HTTP sloj

HTTP sloj je zadužen za prijem i obradu zahteva.

Njegove glavne odgovornosti su:

- definisanje ruta
- obrada JSON zahteva i odgovora
- bezbednosna zaglavlja i CORS
- logovanje zahteva
- autentikacija
- centralizovana obrada grešaka

U praksi to znači da svaki zahtev prolazi kroz isti kontrolisani tok pre nego što stigne do poslovne logike.

## Aplikacioni sloj

Moduli u `src/modules/` predstavljaju glavne funkcionalne celine sistema.

### Auth

Zadužen je za:

- registraciju korisnika
- prijavu korisnika
- identifikaciju trenutno prijavljenog korisnika

### Locations

Zadužen je za:

- listanje poznatih lokacija
- podršku za autocomplete i pretragu lokacija

### Rides

Zadužen je za:

- listanje vožnji
- filtriranje i pretragu vožnji
- objavu nove vožnje
- pregled detalja pojedinačne vožnje

### Profile

Zadužen je za:

- prikaz osnovnih podataka korisnika
- definisanje ugovora za eventualnu izmenu profila

### Dodatni moduli

Posebni moduli postoje i za:

- chat
- recenzije
- plaćanja
- vozila
- verifikacije

Njihova uloga je da jasno definišu mesto tih funkcionalnosti unutar sistema i obezbede API strukturu za njihovu upotrebu.

## Sloj pristupa podacima

Za rad sa bazom koristi se Prisma ORM, dok je baza realizovana kroz SQLite.

Trenutni osnovni modeli su:

- `User`
- `Location`
- `Ride`

### User

Sadrži identitet korisnika, kontakt podatke, režim rada korisnika i osnovne informacije potrebne za prikaz profila.

### Location

Predstavlja lokacije koje se koriste kao polazišta i odredišta vožnji.

### Ride

Predstavlja objavljenu vožnju i povezuje vozača, lokacije, broj mesta, cenu i vreme polaska.

## Tok jednog zahteva

Tipičan tok rada izgleda ovako:

1. Klijent šalje zahtev na `/api/v1/...`.
2. Zahtev prolazi kroz middleware sloj.
3. Ako je potrebno, proverava se JWT token.
4. Zahtev se prosleđuje odgovarajućem modulu.
5. Modul koristi Prisma sloj za rad sa bazom.
6. Odgovor se vraća u standardizovanom JSON formatu.

## Standardizovan odgovor

Backend koristi jedinstvenu strukturu odgovora:

```json
{
  "success": true,
  "message": "Opis operacije",
  "data": {},
  "meta": {}
}
```

Ovakav pristup pojednostavljuje frontend integraciju i čini API konzistentnim.

## Uloga Swagger dokumentacije

Swagger nije dodat samo kao tehnički dodatak, već kao važan deo prezentacije i razumevanja sistema.

Njegova uloga je da:

- prikaže kompletan skup ruta
- objasni ulaze i izlaze svakog endpoint-a
- olakša demonstraciju API sloja
- posluži kao osnova za dalje integracije

## Povezanost sa frontend delom

Frontend prikazuje korisničke tokove, a backend obezbeđuje podatke i pravila potrebna da ti tokovi funkcionišu.

Na primer:

- ekran za prijavu zavisi od `auth` modula
- ekran za pretragu zavisi od `locations` i `rides` modula
- ekran profila zavisi od `profile`, `reviews`, `payments`, `vehicles` i `verifications` modula
- inbox i chat zavise od chat modula

Zbog toga backend nije odvojen tehnički detalj, već direktna podrška korisničkom iskustvu prikazanom na frontendu.
