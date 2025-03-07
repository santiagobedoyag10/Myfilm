import requests

a=requests.get(
    url=("https://api.themoviedb.org/3/movie/changes?page=1"),
    headers={'Authorization': 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmM2M4ZDBiNzM3NTJmNDExM2FmZDBiZjUyODA3ZmRhZiIsIm5iZiI6MTc0MTM2NjI4OC4xNDksInN1YiI6IjY3Y2IyNDEwMzY1OTgyMjZhMWFmZjEzMiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.QO2d8SP-a6bsa-lGR8Lb0mrIn5XH7QrmmVO1flI394Y'}
)
print(str(a.content))