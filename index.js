const menuItems = document.querySelectorAll(".sidebar li");

menuItems.forEach(item => {
  item.addEventListener("click", () => {
    menuItems.forEach(i => i.classList.remove("active"));
    item.classList.add("active");
  });
});
/* Project Progress Chart (Doughnut) */
const projectCtx = document.getElementById('projectChart');

new Chart(projectCtx, {
  type: 'doughnut',
  data: {
    labels: ['Completed', 'In Progress', 'Pending'],
    datasets: [{
      data: [60, 25, 15],
      backgroundColor: ['#22c55e', '#3b82f6', '#f59e0b']
    }]
  },
  options: {
    responsive: true,
    plugins: {
      legend: {
        position: 'bottom'
      }
    }
  }
});

/* Monthly Payments Chart (Bar) */
const paymentCtx = document.getElementById('paymentChart');

new Chart(paymentCtx, {
  type: 'bar',
  data: {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
    datasets: [{
      label: 'Payments (₹)',
      data: [15000, 10000, 20000, 12000, 18000],
      backgroundColor: '#2563eb'
    }]
  },
  options: {
    responsive: true,
    scales: {
      y: {
        beginAtZero: true
      }
    }
  }
});

