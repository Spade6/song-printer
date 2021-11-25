music_list_pop = ["The Weeknd, Blinding Lights",
"Lewis Capaldi,	Someone You Loved",
"Ed Sheeran,	Shape Of You",
"Tones & I,	Dance Monkey",
"Billie Eilish,	Bad Guy",
"Post Malone, Circles",
"Ed Sheeran, Perfect",
"Nickelback	,How You",
"Usher, Lil' Jon & Ludacris, Yeah!",
"Luis Fonsi & Daddy Yankee,	Despacito",
"Lil Nas X & Billy Ray Cyrus, Old Town Road",
"Dua Lipa, Don't Start Now",
"P Diddy, Usher & Loon, I Need A Girl",
"Mariah Carey, All I Want For Christmas Is You",
"Mary J Blige, Family Affair",
"Lifehouse, Hanging By A Moment",
"Timbaland & OneRepublic, Apologize",
"Shawn Mendes & Camila Cabello, Senorita",
"The Black Eyed Peas, I Gotta Feeling",
"Mariah Carey, We Belong Together",
"Alicia Keys, Fallin'",
"Three Doors Down, Kryptonite",
"Mark Ronson & Bruno Mars, Uptown Funk",
"Snow Patrol, Chasing Cars",
"Eminem, Lose Yourself",
"Faith Hill, Breathe",
"Pharrell Williams, Happy",
"Nelly & Kelly Rowland, Dilemma",
"The Pussycat Dolls, Don't Cha",
"OutKast, Hey Ya!",
"Train, Drops Of Jupiter (Tell Me)",
"Lady Gaga & Bradley Cooper, Shallow",
"Maroon 5, Memories",
"Santana & The Product G, Maria Maria",
"Post Malone & Swae Lee, Sunflower",
"50 Cent, In Da Club",
"Camila Cabello & Young Thug, Havana",
"Mario, Let Me Love You",
"Maroon 5 & Cardi B, Girls Like You",
"Roddy Ricch, The Box",
"Faith Hill, The Way You Love Me",
"Adele, Rolling In The Deep",
"Rihanna & Jay-Z, Umbrella",
"The Calling, Wherever You Will Go",
"Kanye West & Jamie Foxx, Gold Digger",
"Kelly Clarkson, Since U Been Gone",
"Creed, With Arms Wide Open",
"Jennifer Lopez & Ja Rule, I'm Real",
"Maroon 5, This Love",
"Lady GaGa, Poker Face",
"Destiny's Child, Independent Woman",
"Shaggy & Ricardo 'RikRok' Ducent, It Wasn't Me",
"LMFAO, Party Rock Anthem",
"Sia, Cheap Thrills",
"James Blunt, You're Beautiful",
"Enrique Iglesias, Hero",
"Vanessa Carlton, A Thousand Miles",
"Joe Thomas, I Wanna Know",
"Fergie, Big Girls Don't Cry (Personal)",
"R Kelly, Ignition",
"The Chainsmokers & Halsey, Closer",
"Ed Sheeran & Justin Bieber, I Don't Care",
"Justin Timberlake, Can't Stop The Feeling",
"The Killers, Mr Brightside",
"Aaliyah, Try Again",
"Timbaland & Keri Hilson, The Way I Are",
"Gotye & Kimbra, Somebody That I Used To Know",
"Leona Lewis, Bleeding Love",
"Ciara & Petey Pablo, Goodies",
"Evanescence & Paul McCoy, Bring Me To Life",
"Toni Braxton, He Wasn't Man Enough",
"Ed Sheeran, Thinking Out Loud",
"Post Malone & 21 Savage, Rockstar",
"Three Doors Down, Here Without You",
"Marshmello & Bastille, Happier",
"Linkin Park, In The End",
"Sean Paul, Get Busy",
"Usher, U Got It Bad",
"Alicia Keys, No One",
"Halsey, Without Me",
"Coldplay, Viva la vida",
"Rob Thomas & Santana, Smooth",
"Shakira & Wyclef Jean, Hips Don't Lie",
"John Legend, All Of Me",
"The Fray, How To Save A Life",
"Madonna, Music",
"OutKast, The Way You Move",
"Avril Lavigne, Complicated"
]


multiple_composers = []

for music in music_list_pop:
    fragments = music.split(",")
    song = fragments[-1]
    artist = fragments[:-1]
    if len(artist) > 1:
        multiple_composers.append(music)
    else:
        pass
        # title = song
        # artist = artist[0]
        # print("{")
        # print('    "composer": "{}",'.format(str(artist)))
        # print('    "title": "{}"'.format(str(title[1:])))
        # print("},")

for music in multiple_composers:
    fragments = music.split(",")
    song = fragments[-1]
    artist = fragments[:-1]
    for fragment in artist:
        artists = artist[0] + "," + artist[1]
    print("{")
    print('    "composer": "{}",'.format(str(artists)))
    print('    "title": "{}"'.format(str(song[1:])))
    print("},")
