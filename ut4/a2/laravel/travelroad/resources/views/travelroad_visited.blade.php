<html>
  <head>
    <title> Travel Road </title>
  </head>
<body>
  <h2>Places I've Already Been To</h2>
    <ul>
      @foreach ($visited as $place)
      <li>{{ $place->name }}</li>
      @endforeach
    </ul>
  <a href="/"> RETURN</a>
</body>
</html>
