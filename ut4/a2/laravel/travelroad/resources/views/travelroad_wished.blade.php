<html>
  <head>
    <title> Travel Road </title>
  </head>
<body>
  <h2>Places I'd like to visit</h2>
    <ul>
      @foreach ($wished as $place)
      <li>{{ $place->name }}</li>
      @endforeach
    </ul>
  <a href="/"> RETURN</a>
</body>
</html>
