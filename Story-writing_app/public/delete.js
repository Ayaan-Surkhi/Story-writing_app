const deleteBtn = document.querySelector('.delete');

deleteBtn.addEventListener('click', async () => {
    const requestEndPoint = `/stories/${deleteBtn.dataset.delete}`;
    
    try{
    const res = await fetch(requestEndPoint, { method: 'DELETE' } );
    const data = await res.json();
    console.log(data);
    window.location.href = data.redirect;
    } catch(err) {
      console.log(err);
    }   
});