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
createPage = (i) => {
    let recipe_div = document.createElement('div');
    recipe_div.setAttribute('id', 'recipe' + i);
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
    p.setAttribute('id', 'recipe_info' + i);
    recipe_div.appendChild(p);
}
async function searchIngredients() {
    document.getElementById('error').style.display = 'none';
    document.getElementById('recipe-grid').style.display = 'none';
    document.getElementById('subtitle').style.display = 'none';
    document.getElementById('loading').style.display = 'flex';
    let list = document.getElementById('ingredients').value;
    list = list.split(',');
    list = list.join(',+');
    const response = await fetch('https://api.spoonacular.com/recipes/findByIngredients?ingredients=' + list + '&apiKey=8fbf4a5632344fb892b407647dfdf419');
    const data = await response.json();
    if (data.length === 0) {
        document.getElementById('loading').style.display = 'none';
        document.getElementById('error').style.display = 'flex';
    }
    if (document.getElementById('recipe-grid')) {
        document.getElementById('recipe-grid').innerHTML = '';
    }
    for (let i = 1; i <= data.length; i++) {
        if (isOdd(i)) {
            let row_div = document.createElement('div');
            row_div.setAttribute('class', 'row');
            row_div.setAttribute('id', 'row' + i)
            document.getElementById('recipe-grid').appendChild(row_div);
            let recipe_div = document.createElement('div');
            recipe_div.setAttribute('id', 'recipe' + i);
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
            p.setAttribute('id', 'recipe_info' + i);
            recipe_div.appendChild(p);
            const test_resp = await fetch(' https://api.spoonacular.com/recipes/' + data[i - 1].id + '/information?includeNutrition=false&apiKey=8fbf4a5632344fb892b407647dfdf419');
            const test_data = await test_resp.json();
            a.textContent = test_data.title;
            a.setAttribute('href', test_data.sourceUrl);
            p.innerHTML = test_data.summary;
            a.textContent = test_data.title;
            img.setAttribute('src', test_data.image);
            a.setAttribute('href', test_data.sourceUrl);
            document.getElementById('row' + i).appendChild(recipe_div);
        } else {
            let recipe_div = document.createElement('div');
            recipe_div.setAttribute('id', 'recipe' + i);
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
            p.setAttribute('id', 'recipe_info' + i);
            recipe_div.appendChild(p);
            const test_resp = await fetch(' https://api.spoonacular.com/recipes/' + data[i - 1].id + '/information?includeNutrition=false&apiKey=8fbf4a5632344fb892b407647dfdf419');
            const test_data = await test_resp.json();
            createPage(i);
            a.textContent = test_data.title;
            a.setAttribute('href', test_data.sourceUrl);
            p.innerHTML = test_data.summary;
            a.textContent = test_data.title;
            img.setAttribute('src', test_data.image);
            a.setAttribute('href', test_data.sourceUrl);
            document.getElementById('row' + (i - 1)).appendChild(recipe_div);
        }
        isLoading(i);
    }
    return data;
}



async function searchRecipe() {
    document.getElementById('error').style.display = 'none';
    document.getElementById('recipe-grid').style.display = 'none';
    document.getElementById('subtitle').style.display = 'none';
    document.getElementById('loading').style.display = 'flex';
    var food = document.getElementById('ingredients').value;
    const response = await fetch('https://api.spoonacular.com/recipes/search?query=' + food + '&apiKey=8fbf4a5632344fb892b407647dfdf419');
    const data = await response.json();
    if (data.results.length === 0) {
        document.getElementById('loading').style.display = 'none';
        document.getElementById('error').style.display = 'flex';
    }
    if (document.getElementById('recipe-grid')) {
        document.getElementById('recipe-grid').innerHTML = '';
    }
    for (let i = 1; i <= data.results.length; i++) {
        if (isOdd(i)) {
            let row_div = document.createElement('div');
            row_div.setAttribute('class', 'row');
            row_div.setAttribute('id', 'row' + i)
            document.getElementById('recipe-grid').appendChild(row_div);
            const test_resp = await fetch(' https://api.spoonacular.com/recipes/' + data.results[i - 1].id + '/information?includeNutrition=false&apiKey=8fbf4a5632344fb892b407647dfdf419');
            const test_data = await test_resp.json();
            let recipe_div = document.createElement('div');
            recipe_div.setAttribute('id', 'recipe' + i);
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
            p.setAttribute('id', 'recipe_info' + i);
            recipe_div.appendChild(p);
            a.textContent = test_data.title;
            img.setAttribute('src', test_data.image);
            a.setAttribute('href', test_data.sourceUrl);
            p.innerHTML = test_data.summary;
            document.getElementById('row' + i).appendChild(recipe_div);
        } else {
            let recipe_div = document.createElement('div');
            recipe_div.setAttribute('id', 'recipe' + i);
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
            p.setAttribute('id', 'recipe_info' + i);
            recipe_div.appendChild(p);
            const test_resp = await fetch(' https://api.spoonacular.com/recipes/' + data.results[i - 1].id + '/information?includeNutrition=false&apiKey=8fbf4a5632344fb892b407647dfdf419');
            const test_data = await test_resp.json();
            a.textContent = test_data.results.title;
            img.setAttribute('src', test_data.image);
            a.setAttribute('href', test_data.sourceUrl);
            p.innerHTML = test_data.summary;
            recipe_div.appendChild(p);
            document.getElementById('row' + (i - 1)).appendChild(recipe_div);
        }
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
    }
}