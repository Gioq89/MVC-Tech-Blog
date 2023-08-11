const dashboard = async (event) => {
    event.preventDefault();
    
    document.location.replace('/dashboard/new');
};

document.querySelector('#dashboard-btn').addEventListener('click', dashboard);