/*
Auteur: Cédric Devost
Date: 2018-12-10
Lien: script.js
Description: fonctions et variables relatives au fonctionnement du TP2 de javascript
*/

/*Instanciation des événements et des variables au lancement de la page*/
window.onload = function () {

    /*cache les pages dont on n'a pas besoin au chargement*/
    document.getElementById("page2").style.display = "none";
    document.getElementById("page3").style.display = "none";
    document.getElementById("page4").style.display = "none";

    /*instancie les 4 flèches*/
    var fleche1 = document.getElementById("fleche1");
    var fleche2 = document.getElementById("fleche2");
    var fleche3 = document.getElementById("fleche3");
    var fleche4 = document.getElementById("fleche4");

    /*instancie une variable pour le textarea*/
    var adresse = document.getElementsByTagName("textarea")[0];

    /*instancie les variables pour les boutons de navigation entre les pages*/
    var boutonCommencer = document.getElementById("commencer");
    var boutonPoursuivre = document.getElementById("goPage3");
    var boutonRetour = document.getElementById("goPage2");
    var boutonTerminer = document.getElementById("goPage4");

    /*instancie des varivables pour les 3 champs de formulaire suivants*/
    var tel = document.formCoo.tel;
    var nom = document.formId.nom;
    var prenom = document.formId.prenom;

    /*Ajouts d'écouteurs d'événements sur les flèches*/
    /*(Pour trouver la solution à votre question, j'ai googlé "addeventlistener paramters js" et ai cliqué sur le premier lien...)*/
    fleche1.addEventListener("click", function () {
        descendreMonter(1);
    });
    fleche2.addEventListener("click", function () {
        descendreMonter(2);
    });
    fleche3.addEventListener("click", function () {
        descendreMonter(3);
    });
    fleche4.addEventListener("click", function () {
        descendreMonter(4);
    });

    /*Ajouts d'écouteurs d'événements sur les boutons de navigation entre les pages*/
    boutonCommencer.addEventListener("click", function () {
        affichePage(2);
    });
    boutonPoursuivre.addEventListener("click", validerPage2);
    boutonRetour.addEventListener("click", function () {
        affichePage(2);
    });
    boutonTerminer.addEventListener("click", function () {
        affichePage(4);
    });

    /*Ajouts d'écouteurs d'événements sur les champs à traitement particulier*/
    adresse.onkeypress = compteCar;
    tel.onkeypress = traiterTelephone;
    nom.onkeypress = traiterNomPrenom;
    prenom.onkeypress = traiterNomPrenom;
}

/*fonction qui permet a l'élément qui recoit le drop de le recevoir*/
function allowDrop(allowdropevent) {
    allowdropevent.preventDefault();
}

/*fonction qui prend le contenu de l'élément à dragger et se préprare à le drop sur son receveur*/
function drag(dragevent) {
    dragevent.dataTransfer.setData("text", dragevent.target.id);
}

/*fonction qui recoit l'élément draggé et le fait apparaitre*/
function drop(dropevent) {
    dropevent.preventDefault();
    var data = dropevent.dataTransfer.getData("text");
    dropevent.target.appendChild(document.getElementById(data));
}

/*fonction qui fait descendre ou monter la ville de préférence pour le job en fonction de la flèche sur laqeulle on a cliqué*/
function descendreMonter(el) {
    
    /*modifie l'index de l'élément à modifier en fonction de la position des flèches*/
    if ((el == 3) || (el == 4)) {
        var positionBase = el - 2;
    } 
    else {
        var positionBase = el - 1;
    }

    /*détermine quel élément est à déplacer*/
    var element1 = document.getElementsByTagName("li")[positionBase];
    var elementTemp = element1.innerHTML;
    
    /*détermine, en fonction de la position de l'élément et du bouton cliqué, quels éléments seront interchangés*/
    if (positionBase == 0) {
        var position = el;   
    } 
    else if ((positionBase == 1) && (el == 3)) {
        var position = el - 3;
    } 
    else if ((positionBase == 1) && (el != 3)) {
        var position = el;
    } 
    else if (positionBase == 2) {
        var position = el - 3;
    }
    
    /*application du changement*/
    var element2 = document.getElementsByTagName("li")[position];
    element1.innerHTML = element2.innerHTML;
    element2.innerHTML = elementTemp;
}

/*fonction qui s'assure qu'aucune touche de chiffre n'est permise*/
function traiterNomPrenom(event) {

    touche = event.charCode || event.keyCode || event.which;
    car = String.fromCharCode(touche);

    if (/\d/.test(car)) {
        return false;
    }
}

/*fonction qui s'assure qu'aucune touche de lettre n'est permise et qui affecte une mise ne page particulière*/
function traiterTelephone(event) {

    var txtOK = "0123456789";
    var car = "";
    var isOk = false;

    touche = event.charCode || event.keyCode || event.which;
    car = String.fromCharCode(touche);

    if (txtOK.indexOf(car) >= 0) {
        isOk = true;
    }

    /*affectation de la mise en page*/
    if (isOk) {
        if (this.value.length == 0) {
            this.value += "(";
        }
        if (this.value.length < 14) {
            this.value += car;
            if (this.value.length == 4) {
                this.value += ") ";
            }
            if (this.value.length == 9) {
                this.value += "-";
            }
        }
    }
    return false;
}

/*fonction qui compte le nombre de caractères restant permis et qui empêche l'utilisateur de tapper s'il l'atteint*/
function compteCar(event) {

    if (this.value.length < 1000) {
        document.getElementsByTagName("span")[0].innerHTML = 999 - this.value.length + " caractères restants";
    } else {
        return false;
    }
}

/*fonction de validation de la page 2 avant de pouvoir acc`der à la page 3*/
function validerPage2() {
    
    /*instanciation d'un objet js*/
    var data = {};

    var valide = false;

    /*regEx pour le code postal et le email*/
    var regExCp = new RegExp("^([A-Z][0-9][A-Z] ?[0-9][A-Z][0-9]$)|([a-z][0-9][a-z] ?[0-9][a-z][0-9])$");
    var regExEmail = new RegExp("^[a-z]+[a-z0-9_-]*@[a-z]+\.[a-z]+(\.[a-z]+)*$");

    /*tant que tout n'Est pas validé, la varibale valide reste a false et la page 3 ne peut être changée*/
    if (valide == false) {
        
        /*Si les champs ne sont pas remplis correctement un meesage d'erruer s'alert et le focus est mis sur l'élément*/
        if (document.formId.nom.value == "") {
            alert("Veuillez entrer votre nom");
            document.formId.nom.focus();
        } 
        else if (document.formId.prenom.value == "") {
            alert("Veuillez entrer votre prenom");
            document.formId.prenom.focus();
        } 
        else if (document.formCoo.courriel.value == "") {
            alert("Veuillez entrer votre courriel");
            document.formCoo.courriel.focus();
        } 
        else if ((document.formCoo.courriel.value != "") && (!regExEmail.test(document.formCoo.courriel.value))) {
            alert("Email Invalide");
            document.formCoo.courriel.focus();
        } 
        else if (document.getElementsByTagName("textarea")[0].value == "") {
            alert("Veuillez entrer votre adresse");
            document.getElementsByTagName("textarea")[0].focus();
        } 
        else if (document.formCoo.cp.value == "") {
            alert("Veuillez entrer votre code postal");
            document.formCoo.cp.focus();
        } 
        else if ((document.formCoo.cp.value != "") && (!regExCp.test(document.formCoo.cp.value))) {
            alert("Code Postal invalide");
            document.formCoo.cp.focus();
        } 
        else if (document.formCoo.tel.value == "") {
            alert("Veuillez entrer votre numéro de téléphone");
            document.formCoo.tel.focus();
        } 
        else {
            
            /*ajout des éléments de formulaire si le formulaire est validé dans l'objet js*/
            data['nom'] = formId.nom.value;
            data['prenom'] = formId.prenom.value;
            data['courriel'] = formCoo.courriel.value;
            data['telephone'] = formCoo.tel.value;
            
            /*conversion de l'objet js en objet json*/
            var JSONobj = JSON.stringify(data);
            localStorage.setItem("oData", JSONobj); 
            
            valide = true;

            affichePage(3);
            afficherJson();
        }
    }
}

/*fonction qui va aller arricher dans la page 4 les éléments enregistrés dans le formulaire*/
function afficherJson(){
    
    /*instanciation des éléments auxquels seront affecter les valeurs à reporter à la dernière page*/
    var pNom = document.getElementById("page4").childNodes[7];
    var pPrenom = document.getElementById("page4").childNodes[9];
    var pCourriel = document.getElementById("page4").childNodes[11];
    var pTel = document.getElementById("page4").childNodes[13];
    
    /*Remettre le fichier json en fichier texte*/
    text = localStorage.getItem("oData");
    dataObj = JSON.parse(text);
		
    /*ajouter le texte aux zones appropriées*/
    pNom.innerHTML = "Nom : " + dataObj.nom;
    pPrenom.innerHTML = "Prénom : " + dataObj.prenom;
    pCourriel.innerHTML = "Courriel : " + dataObj.courriel;
    pTel.innerHTML = "Téléphone : " + dataObj.telephone;    
}

/*fonction qui masque toutes les pages sauf celle qui doit être visible*/
function affichePage(num) {
    hideAllPages();

    document.getElementById("page" + num).style.display = "block";
}

/*fonction qui cache toute les pages sans exception*/
function hideAllPages() {
    document.getElementById("page1").style.display = "none";
    document.getElementById("page2").style.display = "none";
    document.getElementById("page3").style.display = "none";
    document.getElementById("page4").style.display = "none";
}
