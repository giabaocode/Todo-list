let input = document.getElementById("add-activity");
let button = document.getElementById("add-item-btn");
let empty = document.querySelector(".empty");
let theP = document.createElement("p");
let modal = document.getElementsByClassName("modal")[0];
let activities_list = [];                                 
let checkList = document.querySelector(".checkList");
let btn_close = document.querySelector(".square");

function checkEmpty() {
    if (activities_list.length === 0) {
        if (!empty.contains(theP)) { 
            theP.innerHTML = "Chưa có hoạt động nào!";
            theP.style.color = "white";
            theP.style.fontSize = "25px";
            modal.style.display = "none"; 
            empty.appendChild(theP); 
            localStorage.clear();
        }
    } else {
        if (empty.contains(theP)) empty.removeChild(theP); 
    }
}

checkEmpty(); 

button.addEventListener("click", () => {
    if (input.value.trim() !== "") { 
        activities_list.push(input.value.trim());
        localStorage.setItem("Activity" , JSON.stringify(activities_list));;
        input.value = ""; 
       
        checkEmpty();                                                            
        renderActivities(); 
    } else {
        modal.style.display = "block"; 
    }
});


btn_close.addEventListener("click", () => {
    modal.style.display = "none"; 
});


function renderActivities() {                
    checkList.innerHTML = activities_list.map((activity, index) => `
        <div class="wrapper" data-index="${index}">
            <form action="" class="myList">
                <label for="" class="label">${activity}</label>            
                <div class="check-trash">
                    <div class="checkbox-container">
                        <i class="fa-solid fa-square checkbox-icon" style="color: #f4f5f6;"></i>
                    </div>
                    <i class="fa-solid fa-trash trash-icon" style="color: #f7f7f7;"></i>
                </div>
            </form>                                            
        </div>
    `).join("");

  
    document.querySelectorAll(".trash-icon").forEach((icon, index) => {          
        icon.addEventListener("click", () => {
            activities_list.splice(index, 1);
            localStorage.setItem("Activity", JSON.stringify(activities_list));
            checkEmpty();
            renderActivities(); 
        });
    });


    document.querySelectorAll(".checkbox-icon").forEach(icon => {
        icon.addEventListener("click", () => {                                             
            icon.classList.toggle("fa-square"); 
            icon.classList.toggle("fa-square-check"); 
        });
    });
}

checkEmpty(); 








