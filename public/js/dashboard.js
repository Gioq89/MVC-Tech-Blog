const dashboard = async (event) => {
    event.preventDefault();
    document.location.replace('/dashboard');
};

document
.querySelector('#dashboard-btn')
.addEventListener('click', dashboard);