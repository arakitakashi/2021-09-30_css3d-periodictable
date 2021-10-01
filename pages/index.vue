<template>
  <div class="wrapper">
    <ThreeScene/>
    <div class="menu">
      <button class="table">TABLE</button>
      <button class="sphere">SPHERE</button>
      <button class="helix">HELIX</button>
      <button class="grid">GRID</button>
    </div>
  </div>
</template>

<script>
export default {}
</script>
<style>
body {
    width: 100vw;
    height: 100vh;
    overflow: hidden;
}
* {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
}
.element {
  width: 120px;
  height: 160px;
  box-shadow: 0px 0px 12px rgba(0,255,255,0.5);
  border: 1px solid rgba(127,255,255,0.25);
  font-family: Helvetica, sans-serif;
  text-align: center;
  line-height: normal;
  cursor: default;
}

.element:hover {
  box-shadow: 0px 0px 12px rgba(0,255,255,0.75);
  border: 1px solid rgba(127,255,255,0.75);
}

.element .number {
  position: absolute;
  top: 20px;
  right: 20px;
  font-size: 12px;
  color: rgba(127,255,255,0.75);
}

.element .symbol {
  position: absolute;
  top: 40px;
  left: 0px;
  right: 0px;
  font-size: 60px;
  font-weight: bold;
  color: rgba(255,255,255,0.75);
  text-shadow: 0 0 10px rgba(0,255,255,0.95);
}

.element .details {
  position: absolute;
  bottom: 15px;
  left: 0px;
  right: 0px;
  font-size: 12px;
  color: rgba(127,255,255,0.75);
}

button {
    color: rgba(127,255,255,0.75);
    background: transparent;
    outline: 1px solid rgba(127,255,255,0.75);
    border: 0px;
    padding: 5px 10px;
    cursor: pointer;
  }

.menu {
  position: absolute;
  bottom: 20px;
  width: 100%;
  text-align: center;
}

button:hover {
  background-color: rgba(0,255,255,0.5);
}

button:active {
  color: #000000;
  background-color: rgba(0,255,255,0.75);
}
</style>