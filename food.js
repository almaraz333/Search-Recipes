isLoading = (count) => {
    switch (count) {
        case 10:
            document.getElementById('loading').style.display = 'none';
            document.getElementById('recipe-grid').style.display = 'grid';
            break;
        default:
            break;
    }
}

isOdd = (n) => {
    return Math.abs(n % 2) == 1;
}
createPage = (n, info) => {
    if (isOdd(n)) {
        let row_div = document.createElement('div');
        row_div.setAttribute('class', 'row');
        row_div.setAttribute('id', 'row' + n)
        document.getElementById('recipe-grid').appendChild(row_div);
    }
    let recipe_div = document.createElement('div');
    recipe_div.setAttribute('id', 'recipe' + n);
    recipe_div.setAttribute('class', 'recipe-container col-md');
    let img = document.createElement('img');
    img.setAttribute('class', 'img-fluid')
    recipe_div.appendChild(img);
    recipe_div.appendChild(document.createElement('br'));
    let a = document.createElement('a');
    let link_div = document.createElement('div');
    link_div.setAttribute('class', 'recipe_link');
    link_div.appendChild(a);
    recipe_div.appendChild(link_div);
    let p = document.createElement('p');
    p.setAttribute('id', 'recipe_info' + n);
    recipe_div.appendChild(p);
    a.textContent = info.title;
    a.setAttribute('href', info.sourceUrl);
    p.innerHTML = info.summary;
    a.textContent = info.title;
    img.setAttribute('src', info.image);
    a.setAttribute('href', info.sourceUrl);
    if (isOdd(n)) {
        document.getElementById('row' + (n)).appendChild(recipe_div);
    } else {
        document.getElementById('row' + (n - 1)).appendChild(recipe_div);
    }

}
errorCheck = (call_data, api_response) => {
    try {
        if (call_data.results.length === 0) {
            document.getElementById('loading').style.display = 'none';
            let err = document.getElementById('error-text');
            err.innerHTML = '';
            err_message = document.createTextNode('Opps Something Went Wring :/ Possible Spelling Error?');
            err.appendChild(err_message);
            document.getElementById('error').style.display = 'flex';
        }
    } catch (err) {
        if (call_data.length === 0) {
            document.getElementById('loading').style.display = 'none';
            let err = document.getElementById('error-text');
            err.innerHTML = '';
            err_message = document.createTextNode('Opps Something Went Wring :/ Possible Spelling Error?');
            err.appendChild(err_message);
            document.getElementById('error').style.display = 'flex';
        } else if (api_response.status == 402) {
            document.getElementById('loading').style.display = 'none';
            let err = document.getElementById('error-text');
            err.innerHTML = '';
            err_message = document.createTextNode('API Call Limit Reached, Please Try Again Later. Thank You!');
            err.appendChild(err_message);
            document.getElementById('error').style.display = 'flex';
        }
    }
}
loading = () => {
    document.getElementById('error').style.display = 'none';
    document.getElementById('recipe-grid').style.display = 'none';
    document.getElementById('subtitle').style.display = 'none';
    document.getElementById('loading').style.display = 'flex';
}
noChoice = () => {
    let err = document.getElementById('error-text');
    err.innerHTML = '';
    err_message = document.createTextNode('Please Select a Choice');
    err.appendChild(err_message);
    document.getElementById('error').style.display = 'flex';
}
async function searchIngredients() {
    loading();
    let list = document.getElementById('ingredients').value;
    list = list.split(',');
    list = list.join(',+');
    const response = await fetch('https://api.spoonacular.com/recipes/findByIngredients?ingredients=' + list + '&apiKey=8fbf4a5632344fb892b407647dfdf419');
    const data = await response.json();
    if (document.getElementById('recipe-grid')) {
        document.getElementById('recipe-grid').innerHTML = '';
    }
    console.log(data);
    errorCheck(data, response);
    for (let i = 1; i <= data.length; i++) {
        const test_resp = await fetch(' https://api.spoonacular.com/recipes/' + data[i - 1].id + '/information?includeNutrition=false&apiKey=8fbf4a5632344fb892b407647dfdf419');
        const test_data = await test_resp.json();
        createPage(i, test_data);
        isLoading(i);
    }

    return data;
}



async function searchRecipe() {
    loading();
    var food = document.getElementById('ingredients').value;
    const response = await fetch('https://api.spoonacular.com/recipes/search?query=' + food + '&apiKey=8fbf4a5632344fb892b407647dfdf419');
    const data = await response.json();
    if (document.getElementById('recipe-grid')) {
        document.getElementById('recipe-grid').innerHTML = '';
    }
    errorCheck(data, response);
    for (let i = 1; i <= data.results.length; i++) {
        const test_resp = await fetch(' https://api.spoonacular.com/recipes/' + data.results[i - 1].id + '/information?includeNutrition=false&apiKey=8fbf4a5632344fb892b407647dfdf419');
        const test_data = await test_resp.json();
        createPage(i, test_data);
        isLoading(i);
    }
    return data;
}


function returnResult() {
    let e = document.getElementById('recipe_choice');
    let choice = e.options[e.selectedIndex].text;
    switch (choice) {
        case 'By Ingredients':
            searchIngredients();
            break;
        case 'By Dish':
            searchRecipe();
            break;
        case 'Choose':
            noChoice();
            break;
    }
}