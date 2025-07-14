<div>
  <script>
    function ajustarAltura() {
      const iframe = document.getElementById("pag");
    if (iframe && iframe.contentWindow) {
      iframe.style.height = iframe.contentWindow.document.body.scrollHeight + "px";
      }
    }
  </script>

  <script>
    document.getElementById("loginForm").addEventListener("submit", function (e) {
      e.preventDefault();
    const email = document.querySelector('input[type="email"]').value;
    const senha = document.querySelector('input[type="password"]').value;

    if (email === "admin@sagacraft.com" && senha === "123456") {
      alert("Login bem-sucedido!");
    window.location.href = "../index.html";
      } else {
      alert("Credenciais inválidas.");
      }
    });
  </script>
  <script>
    const menuToggle = document.getElementById('menu-toggle');
    const menu = document.getElementById('menu');

 menuToggle.addEventListener('click', () => {
      menu.classList.toggle('active');
    menuToggle.classList.toggle('active');
});
  </script>
  <script>
    window.addEventListener('resize', ajustarAltura);
  </script>
  <script>
 document.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        setTimeout(ajustarAltura, 500);
      });
});
  </script>
  <script>
    function updateOnlinePlayers() {
      fetch('https://api.sagacraft.com/players')
        .then(response => response.json())
        .then(data => {
          document.getElementById('online-count').textContent = data.online;
        });
    setInterval(updateOnlinePlayers, 30000);
    updateOnlinePlayers();
        }
  </script>


</div>