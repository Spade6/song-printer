music_list_latin = ["Despacito – Luis Fonsi & Daddy Yankee featuring Justin Bieber",
"Propuesta Indecente – Romeo Santos",
"A Puro Dolor – Son by Four",
"Si Tú Supieras – Alejandro Fernández",
"La Tortura – Shakira featuring Alejandro Sanz",
"Te Quiero – Flex",
"No Me Doy Por Vencido – Luis Fonsi",
"El Perdón – Nicky Jam & Enrique Iglesias",
"Bailando – Enrique Iglesias featuring Descemer Bueno & Gente de Zona",
"Me Enamora – Juanes",
"Abrázame Muy Fuerte – Juan Gabriel",
"Ritmo (Bad Boys for Life) – Black Eyed Peas X J Balvin",
"Hasta El Amanecer – Nicky Jam",
"Ay Amor – Ana Gabriel",
"Suerte (Whenever, Wherever) – Shakira",
"Dákiti – Bad Bunny & Jhay Cortéz",
"MIA – Bad Bunny featuring Drake",
"No Me Queda Más – Selena",
"De Mi Enamórate – Daniela Romo",
"Ginza – J Balvin"]

music_list_old_pop = [
"Over the Rainbow — Judy Garland",
"White Christmas — Bing Crosby",
"This Land is Your Land — Woody Guthrie",
"Respect — Aretha Franklin",
"American Pie — Don McLean",
"Boogie Woogie Bugle Boy — The Andrews Sisters",
"West Side Story — Original Cast",
"Take Me Out To The Ball Game — Billy Murray",
"You've Lost That Lovin Feelin — The Righteous Brothers",
"The Entertainer — Scott Joplin",
"In The Mood — Glenn Miller Orchestra",
"Rock Around the Clock — Bill Haley & The Comets",
"When the Saints Go Marching In — Louis Armstrong",
"You Are My Sunshine — Jimmie Davis",
"Mack the Knife — Bobby Darin",
"Satisfaction — The Rolling Stones",
"Take the 'A' Train — Duke Ellington Orchestra",
"Blueberry Hill — Fats Domino",
"God Bless America — Kate Smith",
"Stars and Stripes Forever — Sousa's Band",
]

music_list_french = [
"Stromae – Papaoutai",
"Julien Doré – Le Lac",
"Florent Pagny – Savoir Aimer",
"Grand Corps Malade – Les Voyages en Train",
"Francis Cabrel – Je l’Aime à Mourir",
"Jean-Jacques Goldman – Les choses",
"Garou – Je n’attendais que vous",
"Christophe Maé – La Parisienne",
"Fréro Delavega – Mon Petit Pays",
"Mika – Elle Me Dit",
"Natasha St-Pier – Tu Trouveras",
"Amel Bent – Le Droit à l’Erreur",
"Hélène Ségara – Rien n’est comme avant ",
"Louane – Maman",
"Coeur de Pirate – Mistral Gagnant",
"TAL – Je prends le large",
"Zaz – Sous le ciel de Paris",
"Shy’m – Tourne",
"Céline Dion – On s’est aimé à cause",
"Lara Fabian – Je suis malade"
]

music_list_frenchtouch = [
"MotorBass – Les Ondes ",
"Sebastien Leger – We Are",
"Grant Phabao – Tub ",
"Thomas Bangalter – Club Soda ",
"Daft Punk – Burnin",
"Cassius – La Mouche ",
"Jess & Crabb – Big Booya ",
"Le Knight Club – Boogie Shell",
"French79 – Hometown",
"Phoenix – Heatwave"]

music_list_jazz = [
"God Bless The Child – Billie Holiday",
"How High The Moon – Ella Fitzgerald",
"Stella By Starlight – Miles Davis",
"St. Thomas – Sonny Rollins",
"Ain't Misbehavin – Fats Waller",
"Take The 'A' Train – Duke Ellington",
"So What – Miles Davis",
"On The Sunny Side of the Street – Dizzy Gillespie",
"Night and Day – Joe Henderson",
"All The Things You Are – Bill Evans",
"Straight, No Chaser – Miles Davis",
"It Don't Mean a Thing (If It Ain't Got That Swing) – Duke Ellington",
"Fly Me to the Moon – Frank Sinatra",
"Autumn Leaves – Cannonball Adderley",
"Georgia On My Mind – Billie Holiday",
"Round Midnight – Thelonious Monk",
"The Girl From Ipanema – Stan Getz",
"Body and Soul – Coleman Hawkins",
"I Got Rhythm – Sarah Vaughan",
"Summertime – Ella Fitzgerald & Louis Armstrong",
]
multiple_composers = []
print(len(music_list_old_pop) + len(music_list_latin) + len(music_list_french) + len(music_list_frenchtouch) + len(music_list_jazz))
for music in music_list_jazz:
    song, artist = music.split("–")
    title = song
    artist = artist
    print("{")
    print('    "composer": "{}",'.format(str(artist[1:])))
    print('    "title": "{}"'.format(str(title[:-1])))
    print("},")



