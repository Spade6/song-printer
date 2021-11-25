
music_list_citypop = ["Seaside Lovers, Evening Shadows",
"Haruko Kuwana, Akogareno Sundown",
"Tatsuro Yamashita, Space Crush",
"Harumi Ohzora, Lagoon Hotel",
"Noriki, Do What You Do",
"Mariya Takeuchi, Plastic Love",
"Kyoko Takami, Yume Ni Anata",
"Miki Matsubara, Stay With Me",
"Vizion, Somebody’s Getting To You",
"Makoto Matsushita, First Light"]
music_list_britpop = [
"Champagne Supernova, Oasis",
"Don't Look Back In Anger, Oasis",
"Live Forever, Oasis",
"Creep, Radiohead",
"Somewhere Only We Know, Keane",
"Everybody's Changing, Keane",
"Can't Stop Now, Keane",
"Starlight, Muse",
"Super Massive Black Hole, Muse",
"Plug In Baby, Muse",
"Yellow, Coldplay",
"In My Place, Coldplay"]
for music in music_list_britpop:
    song, artist = music.split(",")
   
    artist = artist
    title = song
    print("{")
    print('    "artist": "{}",'.format(str(artist[1:])))
    print('    "title": "{}"'.format(str(title)))
    print("},")