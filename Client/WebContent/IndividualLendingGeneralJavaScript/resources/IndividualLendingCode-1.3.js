crudData = {
		loanproduct: {
				editTemplateNeeded: true,
				refreshListNeeded: true,
				dialogWidth: 850,
				dialogHeight: 550
			},
		savingproduct: {
				editTemplateNeeded: true,
				refreshListNeeded: true,
				dialogWidth: 850,
				dialogHeight: 550
			},
		depositproduct: {
				editTemplateNeeded: true,
				refreshListNeeded: true,
				dialogWidth: 850,
				dialogHeight: 550
			},	
		office: {
				editTemplateNeeded: true,
				refreshListNeeded: true,
				dialogWidth: 600,
				dialogHeight: 400
			},
			
			order: {
				editTemplateNeeded: true,
				refreshListNeeded: true,
				dialogWidth: 600,
				dialogHeight: 275
			},
			
	ticket: {
				editTemplateNeeded: true,
				refreshListNeeded: true,
				dialogWidth: 600,
				dialogHeight: 275
			},
			
subscription: {
				editTemplateNeeded: true,
				refreshListNeeded: true,
				dialogWidth: 600,
				dialogHeight: 275
			},
			
			paymode: {
				editTemplateNeeded: true,
				refreshListNeeded: false,
				dialogWidth: 600,
				dialogHeight: 275
			},
			
			 plan: {
			     editTemplateNeeded: true,
				 refreshListNeeded: true,
				dialogWidth: 850,
				dialogHeight: 450
		    	},
   	  price: {
				     editTemplateNeeded: true,
						 refreshListNeeded: false,
						dialogWidth: 650,
						dialogHeight: 275
				    	},
						
	servicemaster: {
			   editTemplateNeeded: true,
			   refreshListNeeded: true,
			   dialogWidth: 500,
			   dialogHeight: 270 
			  },
			  
			item: {
					   editTemplateNeeded: true,
					   refreshListNeeded: true,
					   dialogWidth: 750,
					   dialogHeight: 270 
					  }, 
		fund: {
				editTemplateNeeded: false,
				refreshListNeeded: true,
				dialogWidth: 600,
				dialogHeight: 275
			},
		code: {
				editTemplateNeeded: false,
				refreshListNeeded: true,
				dialogWidth: 600,
				dialogHeight: 275
			},			
	     configuration: {
				editTemplateNeeded: false,
				refreshListNeeded: true,
				dialogWidth: 600,
				dialogHeight: 275
		 },	
		employee: {
				editTemplateNeeded: true,
				refreshListNeeded: true,
				dialogWidth: 600,
				dialogHeight: 325
			},
		charge: {
				editTemplateNeeded: true,
				refreshListNeeded: true,
				dialogWidth: 600,
				dialogHeight: 450
			},
		user: {
				editTemplateNeeded: true,
				refreshListNeeded: true,
				dialogWidth: 1000,
				dialogHeight: 550
			},
		role: {
				editTemplateNeeded: false,
				refreshListNeeded: true,
				dialogWidth: 1000,
				dialogHeight: 550
			},
		orgCurrency: {
				editTemplateNeeded: false,
				refreshListNeeded: false,
				dialogWidth: 900,
				dialogHeight: 400
			},
		permission: {
				editTemplateNeeded: false,
				refreshListNeeded: false,
				dialogWidth: 1200,
				dialogHeight: 500
			},
		officetransaction: {
				editTemplateNeeded: true,
				refreshListNeeded: true,
				dialogWidth: 900,
				dialogHeight: 400
			},
		bulkLoanReassignment: {
				editTemplateNeeded: true,
				refreshListNeeded: false,
				dialogWidth: 600,
				dialogHeight: 500	
		},
		datatable: {
				editTemplateNeeded: false,
				refreshListNeeded: true,
				dialogWidth: 900,
				dialogHeight: 300
			}
		};

saveSuccessFunctionReloadClient =  function(data, textStatus, jqXHR) {
						  	$("#dialog-form").dialog("close");
		  					showILClient(currentClientId );
				  		};

saveSuccessFunctionReloadClientListing =  function(data, textStatus, jqXHR) {
	$("#dialog-form").dialog("close");
	showILClientListing();
};

formErrorFunction = function(jqXHR, textStatus, errorThrown) {
	handleXhrError(jqXHR, textStatus, errorThrown, "#formErrorsTemplate", "#formerrors");
};

//formErrorFunction = function(jqXHR, textStatus, errorThrown) {
//	handleXhrError(jqXHR, textStatus, errorThrown, "#inventoryItemFormTemplate", "#formerrors");
//};

generalErrorFunction = function(jqXHR, textStatus, errorThrown) {
//console.log("complete after  - for when an error is got but not on a create/update form");
				    	//handleXhrError(jqXHR, textStatus, errorThrown, "#formErrorsTemplate", "#formerrors");
				};


function executeAjaxRequest(url, verbType, jsonData, successFunction, errorFunction) { 
	//console.log("executeAjaxRequest");
	var jqxhr = $.ajax({ 
				url : baseApiUrl + url, 
				type : verbType, //POST, GET, PUT or DELETE 
				contentType : "application/json; charset=utf-8", 
				dataType : 'json', 
				data : jsonData, 
				cache : false, 
				beforeSend : function(xhr) { 
					  var button = $(".ui-dialog-buttonpane button:contains('Save')");
					  //console.log("executeAjaxRequest");
					 $(button).button("disable");
                    
						if (tenantIdentifier > "") xhr.setRequestHeader("X-Mifos-Platform-TenantId", tenantIdentifier); 
						if (base64 > "") xhr.setRequestHeader("Authorization", "Basic " + base64); 
					}, 
				success : successFunction, 
				complete:function(xhr){
					 var button = $(".ui-dialog-buttonpane button:contains('Save')");
						
					 $(button).button("enable");
					
				},
				error : errorFunction 
			}); 
}

function executeAjaxRequestForImageDownload(url, verbType,successFunction, errorFunction) { 

	var jqxhr = $.ajax({ 
				url : baseApiUrl + url, 
				type: verbType, //POST, GET, PUT or DELETE 
				data: null,
				beforeSend : function(xhr) { 
						if (tenantIdentifier > "") xhr.setRequestHeader("X-Mifos-Platform-TenantId", tenantIdentifier); 
						if (base64 > "") xhr.setRequestHeader("Authorization", "Basic " + base64); 
					}, 
				success : successFunction, 
				error : errorFunction 
			}); 
}

function executeAjaxOctetStreamDownloadRequest(url) { 
	 $.fileDownload(baseApiUrl + url +"?tenantIdentifier="+tenantIdentifier, {
        //preparingMessageHtml: "Please wait while your document is downloaded...",
        //failMessageHtml: "There was a problem downloading the document, please try again.",
        httpMethod: "GET"
    });
}

function executeMultipartUploadAjaxRequest(url, verbType, formData, successFunction, errorFunction) { 
	var jqxhr = $.ajax({ 
				url : baseApiUrl + url, 
				type : verbType, //POST, GET, PUT or DELETE 
				contentType : false, 
				processData: false,
				data : formData, 
				cache : false, 
				beforeSend : function(xhr) { 
						if (tenantIdentifier > "") xhr.setRequestHeader("X-Mifos-Platform-TenantId", tenantIdentifier); 
						if (base64 > "") xhr.setRequestHeader("Authorization", "Basic " + base64); 
					}, 
				success : successFunction, 
				error : errorFunction 
			}); 
}

// load html functions
function showMainContainer(containerDivName, username) {

	var htmlVar = '<div id="logowrapper">';
	htmlVar += '	<span style="float: left">';
	htmlVar += '		<img style="float:left; border: 0;" alt="" src="resources/mifos.jpg"/>';
	htmlVar += '	</span>';
	htmlVar += '</div>';
	htmlVar += '<div id="navwrapper">';
	htmlVar += '<ul id="nav" class="floatleft">';

	if (jQuery.MifosXUI.showMenu("ClientsMenu") == true)
		htmlVar += '	<li><a href="unknown.html" onclick="showILClientListing();return false;">' + doI18N("link.topnav.clients") + '</a></li>';
	
	if (jQuery.MifosXUI.showMenu("CheckerMenu") == true)
		htmlVar += '	<li><a href="unknown.html" onclick="showMakerCheckerListing();return false;">' + doI18N("link.topnav.makercheckerinbox") + '</a></li>';

	if (jQuery.MifosXUI.showMenu("GroupsMenu") == true)
		htmlVar += '	<li><a href="unknown.html" onclick="showILGroupListing();return false;">' + doI18N("link.topnav.groups") + '</a></li>';

	if (jQuery.MifosXUI.showMenu("UserAdminMenu") == true)
		htmlVar += '	<li><a href="unknown.html" onclick="setUserAdminContent(' + "'" + 'content' + "'" +');return false;">' + doI18N("link.topnav.users") + '</a></li>';

	if (jQuery.MifosXUI.showMenu("OrgAdminMenu") == true)
		 htmlVar += '	<li><a href="unknown.html" onclick="setOrgAdminContent(' + "'" + 'content' + "'" + ');return false;">' + doI18N("link.topnav.organisation") + '</a></li>';
	
	if (jQuery.MifosXUI.showMenu("SysAdminMenu") == true)
		htmlVar += '	<li><a href="unknown.html" onclick="setSysAdminContent(' + "'" + 'content' + "'" + ');return false;">' + doI18N("link.topnav.system") + '</a></li>';
	
	if (jQuery.MifosXUI.showMenu("AccountingMenu") == false)
		htmlVar += '  <li><a href="unknown.html" onclick="setAccountingContent(' + "'" + 'content' + "'" + ');return false;">' + doI18N("link.topnav.accounting") + '</a></li>';

	if (jQuery.MifosXUI.showMenu("ReportsMenu") == false)
	{
		htmlVar += '	<li class="dmenu"><a href="unknown.html" onclick="return false;">' + doI18N("link.reports") + '</a>';
		htmlVar += '		<ul>';
		htmlVar += '			<li><a href="unknown.html" onclick="showILReporting();return false;">' + doI18N("link.reports.all") + '</a></li>';
		htmlVar += '			<li><a href="unknown.html" onclick="showILReporting(' + "'" + 'Client' + "'" + ');return false;">' + doI18N("link.reports.client") + '</a></li>';
		htmlVar += '			<li><a href="unknown.html" onclick="showILReporting(' + "'" + 'Loan' + "'" + ');return false;">' + doI18N("link.reports.loan") + '</a></li>';
		htmlVar += '			<li><a href="unknown.html" onclick="showILReporting(' + "'" + 'Fund' + "'" + ');return false;">' + doI18N("link.reports.fund") + '</a></li>';
		
		if (jQuery.MifosXUI.showMenu("AccountingMenu") == false)
			htmlVar += '      		<li><a href="unknown.html" onclick="showILReporting(' + "'" + 'Accounting' + "'" + ');return false;">' + doI18N("link.reports.accounting") + '</a></li>';
		
		htmlVar += '		</ul>';
		htmlVar += '	</li>';
	}
	
	htmlVar += '	<li><a href="unknown.html" onclick="setSubscriptionContent(' + "'" + 'content' + "'" + ');return false;">' + doI18N("link.topnav.subscription") + '</a></li>';
	htmlVar += '	<li><a href="unknown.html" onclick="showTickets();return false;">' + doI18N("link.tickets.show.tickets") + '</a></li>';
	htmlVar += '	<li><a href="unknown.html" onclick="generateInvoice();return false;">' + doI18N("link.bulk.generate.invoices") + '</a></li>';
	if (jQuery.MifosXUI.showMenu("POSTINTERESTMENU") == true) {
		htmlVar += '	<li  class="dmenu"><a href="unknown.html" onclick="return false;">' + doI18N("label.interest.posting") + '</a>';
		htmlVar += '		<ul>';
		htmlVar += '			<li><a href="unknown.html" onclick="postInterest();return false;">' + doI18N("link.interest.posting.fixed.deposits") + '</a></li>';
		htmlVar += '			<li><a href="unknown.html" onclick="postInterestForSavingAccounts();return false;">' + doI18N("link.interest.posting.saving.accounts") + '</a></li>';
		htmlVar += '		</ul>';
		htmlVar += '	</li>';
	}	
	
	htmlVar += '	<li><a href="unknown.html" onclick="return false;">' + doI18N("label.tenant.name") + ': ' + tenantIdentifier + '</a></li>';
	htmlVar += '</ul>';
	htmlVar += '<ul id="nav" class="floatright">';
	htmlVar += '	<li class="dmenu"><a href="unknown.html" onclick="return false;">' + doI18N("link.topnav.culture") + '</a>';
	htmlVar += '		<ul>';
	htmlVar += '			<li><a href="unknown.html" onclick="setCultureReshowFirstPage(' + "'" + 'en' + "'" + ');return false;">English</a></li>';
	htmlVar += '			<li><a href="unknown.html" onclick="setCultureReshowFirstPage(' + "'" + 'fr' + "'" + ');return false;">French</a></li>';
	htmlVar += '			<li><a href="unknown.html" onclick="setCultureReshowFirstPage(' + "'" + 'es' + "'" + ');return false;">Spanish</a></li>';
	htmlVar += '			<li><a href="unknown.html" onclick="setCultureReshowFirstPage(' + "'" + 'es-PE' + "'" + ');return false;">Spanish (Peru)</a></li>';
	htmlVar += '			<li><a href="unknown.html" onclick="setCultureReshowFirstPage(' + "'" + 'pt' + "'" + ');return false;">Portuguese</a></li>';
	htmlVar += '			<li><a href="unknown.html" onclick="setCultureReshowFirstPage(' + "'" + 'zh' + "'" + ');return false;">Chinese</a></li>';
	htmlVar += '		</ul>';
	htmlVar += '	</li>';
	htmlVar += '	<li><a href="unknown.html" onclick="showAccountSettings();return false;" class="dmenu"><div id=displayUN>' + currentUserName + '</div></a>';
	htmlVar += '		<ul>';
	htmlVar += '			<li><a href="unknown.html" onclick="showAccountSettings();return false;">' + doI18N("link.topnav.account.settings") + '</a></li>';
	htmlVar += '		</ul>';
	htmlVar += '	</li>';
	htmlVar += '	<li><a href="unknown.html" onclick="signOut(' + "'" + containerDivName + "'" + ');return false;">' + doI18N("link.signout") + '</a></li>';
	htmlVar += '</ul>';
	htmlVar += '<br class="clear">';
	htmlVar += '</div><div style="float:none; clear:both;">';
	htmlVar += '	<div id="spacer" style="line-height: 15px;">&nbsp;</div>';
	htmlVar += '	<div id="content"></div>';
	htmlVar += '</div>';

	$("#" + containerDivName).html(htmlVar);
}


function showLogon(logonDivName) {
	var htmlVar = '<div id=theLogonForm><div id=appTitle>' + doI18N("app.name") + ' ' + doI18N("") + '</div>';
	htmlVar += '<form name = "logonform"><table id=logonTable><tr><td>' + doI18N("login.username") + '</td><td><input type="text" name="username"></td></tr>';
	htmlVar += '<tr><td>' + doI18N("login.password") + '</td><td><input type="password" name="pwd" onKeyPress="return checkSubmit(event, ' + "'" + logonDivName + "'" + ', document.logonform.username.value, document.logonform.pwd.value )"></td></tr>';
	htmlVar += '<tr><td><input type="button" value="Logon" name="Submit" ';
	htmlVar += 'onclick= "setBasicAuthKey(' + "'" + logonDivName + "'" + ', document.logonform.username.value, document.logonform.pwd.value )"></td><td></td></tr></table></form>';
	htmlVar += '<div id=formerrors></div></div>';

	$("#" + logonDivName).html(htmlVar);
}

function setClientListingContent(divName) {
	var htmlVar = "";
	
	if (jQuery.MifosXUI.showTask("ADDCLIENT") == true) 
		htmlVar = '<button id="addclient" style="clear: both;">' + doI18N("link.add.new.client") + '</button>';
	
	htmlVar += '<div id="tabs"><ul><li><a href="#searchtab" title="searchtab">' + doI18N("tab.search") + '</a></li></ul><div id="searchtab"></div></div>';

	$("#" + divName).html(htmlVar);
}

function setGroupListingContent(divName){
	var htmlVar = '<button id="addgroup" style="clear: both;">' + doI18N("link.add.new.group") + '</button>';
	htmlVar += '<div id="tabs"><ul><li><a href="#searchtab" title="searchtab">' + doI18N("tab.search") + '</a></li></ul><div id="searchtab"></div><label>Item Details</label></div>';

	$("#" + divName).html(htmlVar);
}

function setClientContent(divName) {
	var htmlVar = '<div  id="clientmaintab"></div>'
	htmlVar += '<div id="newtabs">	<ul><li><a href="unknown.html"'; 
	htmlVar += ' title="clienttab" class="topleveltab"><span id="clienttabname">' + doI18N("client.general.tab.name") + '</span></a></li>';


	htmlVar += '<li><a href="nothing" title="clientidentifiertab" class="topleveltab"><span id="clientidentifiertabname">' + doI18N("client.identifier.tab.name")  + '</span></a></li>';
	htmlVar += '<li><a href="nothing" title="clientdocumenttab" class="topleveltab"><span id="clientdocumenttabname">' + doI18N("client.document.tab.name")  + '</span></a></li>';
	htmlVar += '<li><a href="nothing" title="clientorderstab" class="topleveltab"><span id="clientdocumenttabname">' + doI18N("client.order.tab.name")  + '</span></a></li>';
	htmlVar += '<li><a href="nothing" title="clientsaletab" class="topleveltab"><span id="clientdocumenttabname">' + doI18N("client.onetime.tab.name")  + '</span></a></li>';
	htmlVar += '<li><a href="nothing" title="clienttransactiontab" class="topleveltab"><span id="clientdocumenttabname">' + doI18N("client.transaction.tab.name")  + '</span></a></li>';
	htmlVar += '<li><a href="nothing" title="clientbillstatementtab" class="topleveltab"><span id="clientdocumenttabname">' + doI18N("client.statment.tab.name")  + '</span></a></li>';	
	htmlVar += '<li><a href="nothing" title="clienttickettab" class="topleveltab"><span id="clientdocumenttabname">' + doI18N("client.ticKet.tab.name")  + '</span></a></li>';
	htmlVar += '<li><a href="nothing" title="inventorytab" class="topleveltab"><span id="clientdocumenttabname">' + doI18N("inventory.tab.name")  + '</span></a></li>';
	htmlVar += '</ul><div id="clienttab"></div><div id="clientidentifiertab"></div><div id="clientdocumenttab"></div></div></div>';
	$("#" + divName).html(htmlVar);
}

function setGroupContent(divName) {
	var htmlVar = '<div id="newtabs">	<ul><li><a href="unknown.html"'; 
	htmlVar += ' title="grouptab" class="topleveltab"><span id="grouptabname">' + doI18N("app.loading") + '</span></a></li></ul><div id="grouptab"></div></div>';
	
	$("#" + divName).html(htmlVar);
}

function setAddLoanContent(divName) {

	var htmlVar = '<div id="inputarea"></div><div id="schedulearea"></div>'
	$("#" + divName).html(htmlVar);
}

function setAddBulkLoanContent(divName) {
	var htmlVar = '<div id="selectclientsarea"></div><div id="inputarea"></div>';
	$("#" + divName).html(htmlVar);
}

function setAddDepositContent(divName) {

	var htmlVar = '<div id="inputarea"></div><div id="schedulearea"></div>'
	$("#" + divName).html(htmlVar);
	}

function setAddSavingContent(divName) {

	var htmlVar = '<div id="inputarea"></div><div id="schedulearea"></div>'
	$("#" + divName).html(htmlVar);
	}


function setOrgAdminContent(divName) {

	var addProductUrl = "maintainTable('loanproduct', 'loanproducts', 'POST');return false;";
	var addSavingProductUrl="maintainTable('savingproduct', 'savingproducts', 'POST');return false;";
	var addDepositProductUrl="maintainTable('depositproduct', 'depositproducts', 'POST');return false;";
	var addOfficeUrl = "maintainTable('office', 'offices', 'POST');return false;";
	var addFundUrl = "maintainTable('fund', 'funds', 'POST');return false;";
	var addEmployeeUrl = "maintainTable('employee', 'staff', 'POST');return false;";
	var addChargeUrl = "maintainTable('charge', 'charges', 'POST');return false;";
	var orgCurrencyUrl = "maintainTable('orgCurrency', 'currencies', 'PUT');return false;";
	var officeMoneyTransfer = "maintainTable('officetransaction', 'officetransactions', 'POST');return false;";
	var bulkLoanReassignmentUrl = "maintainTable('bulkLoanReassignment', 'loans/loanreassignment', 'POST');return false;";

	var htmlOptions = "";
	if (jQuery.MifosXUI.showTask("ViewLoanProducts") == false)
		htmlOptions += ' | <a href="unknown.html" onclick="refreshTableView(' + "'loanproduct'" + ');return false;" id="viewloanproducts">' + doI18N("administration.link.view.loan.products") + '</a>';

	if (jQuery.MifosXUI.showTask("AddLoanProduct") == false)
		htmlOptions += ' | <a href="unknown.html" onclick="' + addProductUrl + '" id="addloanproduct">' + doI18N("administration.link.add.loan.product") + '</a>';

	if (jQuery.MifosXUI.showTask("ViewSavingProducts") == true)
		htmlOptions += ' | <a href="unknown.html" onclick="refreshTableView(' + "'savingproduct'" + ');return false;" id="viewsavingproducts">' + doI18N("administration.link.view.saving.products") + '</a>';
	
	if (jQuery.MifosXUI.showTask("AddSavingProduct") == true)
		htmlOptions += ' | <a href="unknown.html" onclick="' + addSavingProductUrl + '" id="addsavingproduct">' + doI18N("administration.link.add.saving.product") + '</a>';

	if (jQuery.MifosXUI.showTask("ViewDepositProducts") == true)
		htmlOptions += ' | <a href="unknown.html" onclick="refreshTableView(' + "'depositproduct'" + ');return false;" id="viewdepositproducts">' + doI18N("administration.link.view.deposit.products") + '</a>';

	if (jQuery.MifosXUI.showTask("AddDepositProduct") == true)
		htmlOptions += ' | <a href="unknown.html" onclick="' + addDepositProductUrl + '" id="adddepositproduct">' + doI18N("administration.link.add.deposit.product") + '</a>';

	if (jQuery.MifosXUI.showTask("ViewFunds") == false)
		htmlOptions += ' | <a href="unknown.html" onclick="refreshTableView(' + "'fund'" + ');return false;" id="viewfunds">' + doI18N("administration.link.view.funds") + '</a>';

	if (jQuery.MifosXUI.showTask("AddFund") == false)
		htmlOptions += ' | <a href="unknown.html" onclick="' + addFundUrl + '" id="addfund">' + doI18N("administration.link.add.fund") + '</a>';

	if (jQuery.MifosXUI.showTask("ViewEmployees") == false)
		htmlOptions += ' | <a href="unknown.html" onclick="refreshTableView(' + "'employee'" + ');return false;" id="viewemployees">' + doI18N("administration.link.view.employees") + '</a>';

	if (jQuery.MifosXUI.showTask("AddEmployee") == false)
		htmlOptions += ' | <a href="unknown.html" onclick="' + addEmployeeUrl + '" id="addemployee">' + doI18N("administration.link.add.employee") + '</a>';

	if (jQuery.MifosXUI.showTask("ViewCharges") == false)
		htmlOptions += ' | <a href="unknown.html" onclick="refreshTableView(' + "'charge'" + ');return false;" id="viewcharges">' + doI18N("administration.link.view.charges") + '</a>';

	if (jQuery.MifosXUI.showTask("AddCharge") == false)
		htmlOptions += ' | <a href="unknown.html" onclick="' + addChargeUrl + '" id="addcharge">' + doI18N("administration.link.add.charge") + '</a>';

	if (htmlOptions > "")
	{
		htmlOptions += '<br><br>';
		htmlOptions = htmlOptions.substring(3)
	}

	var htmlOptions2 = "";
	if (jQuery.MifosXUI.showTask("CurrencyConfiguration") == false)
		htmlOptions2 += ' | <a href="unknown.html" onclick="' + orgCurrencyUrl + '" id="editconfiguration">' + doI18N("administration.link.currency.configuration") + '</a>';

	if (jQuery.MifosXUI.showTask("ViewOffices") == true)
		htmlOptions2 += ' | <a href="unknown.html" onclick="refreshTableView(' + "'office'" + ');return false;" id="viewoffices">' + doI18N("administration.link.view.offices") + '</a>';

	if (jQuery.MifosXUI.showTask("AddOffice") == true)
		htmlOptions2 += ' | <a href="unknown.html" onclick="' + addOfficeUrl + '" id="addoffice">' + doI18N("administration.link.add.office") + '</a>';
/*
	if (jQuery.MifosXUI.showTask("ViewOfficeMoneyTxns") == true)
		htmlOptions2 += ' | <a href="unknown.html" onclick="refreshTableView(' + "'officetransaction'" + ');return false;" id="viewofficetransactions">' + doI18N("administration.link.view.office.money.transfers") + '</a>';

	if (jQuery.MifosXUI.showTask("AddOfficeMoneyTxn") == true)
		htmlOptions2 += ' | <a href="unknown.html" onclick="' + officeMoneyTransfer + '" id="internalTransfer">' + doI18N("administration.link.office.money.transfer") + '</a>';

	if (jQuery.MifosXUI.showTask("BulkLoanReassignment") == true)
		htmlOptions2 += ' | <a href="unknown.html" onclick="' + bulkLoanReassignmentUrl + '" id="bulkLoanReassignment">' + doI18N("administration.link.bulk.loan.reassignment") + '</a>';	
*/
	if (htmlOptions2 > "")
	{
		htmlOptions2 = htmlOptions2.substring(3);
	}

	$("#" + divName).html(simpleOptionsHtml(htmlOptions + htmlOptions2));
}


function setUserAdminContent(divName) {

	var addUserUrl = "maintainTable('user', 'users', 'POST');return false;";
	var addRoleUrl = "maintainTable('role', 'roles', 'POST');return false;";

	var htmlOptions = "";
	if (jQuery.MifosXUI.showTask("ViewUsers") == true)
		htmlOptions += ' | <a href="unknown.html" onclick="refreshTableView(' + "'user'" + ');return false;" id="listusers">' + doI18N("administration.link.view.users") + '</a>';

	if (jQuery.MifosXUI.showTask("AddUser") == true)
		htmlOptions += ' | <a href="unknown.html" onclick="' + addUserUrl + '" id="adduser">' + doI18N("administration.link.add.user") + '</a>';

	if (jQuery.MifosXUI.showTask("ViewRoles") == true)
		htmlOptions += ' | <a href="unknown.html" onclick="refreshTableView(' + "'role'" + ');return false;" id="listroles">' + doI18N("administration.link.view.roles") + '</a>';

	if (jQuery.MifosXUI.showTask("AddRole") == true)
		htmlOptions += ' | <a href="unknown.html" onclick="' + addRoleUrl + '" id="addrole">' + doI18N("administration.link.add.role") + '</a>';
	
	if (htmlOptions > "") htmlOptions = htmlOptions.substring(3);

	$("#" + divName).html(simpleOptionsHtml(htmlOptions));
}

function setSysAdminContent(divName) {

	var addCodeUrl = "maintainTable('code', 'codes', 'POST');return false;";
	var maintainMakerCheckerUrl = "maintainTable('permission', 'permissions?makerCheckerable=true', 'PUT');return false;";
	var registerDatatableUrl = "maintainTable('datatable', 'datatables', 'POST');return false;";

	var htmlOptions = "";
	if (jQuery.MifosXUI.showTask("VIEWDATATABLES") == true)
		htmlOptions += ' | <a href="unknown.html" onclick="refreshTableView(' + "'datatable'" + ');return false;" id="listdatatables">' + doI18N("administration.link.view.datatables") + '</a>';

	if (jQuery.MifosXUI.showTask("REGISTERDATATABLE") == true)
		htmlOptions += ' | <a href="unknown.html" onclick="' + registerDatatableUrl + '" id="registerdatatable">' + doI18N("administration.link.register.datatable") + '</a>';

	if (jQuery.MifosXUI.showTask("ViewCodes") == true)
		htmlOptions += ' | <a href="unknown.html" onclick="refreshTableView(' + "'code'" + ');return false;" id="viewcodes">' + doI18N("administration.link.view.code") + '</a>';

	if (jQuery.MifosXUI.showTask("AddCode") == true)
		htmlOptions += ' | <a href="unknown.html" onclick="' + addCodeUrl + '" id="addcode">' + doI18N("administration.link.add.code") + '</a>';

	if (jQuery.MifosXUI.showTask("ViewPermissions") == true)
		htmlOptions += ' | <a href="unknown.html" onclick="refreshTableView(' + "'permission'" + ');return false;" id="listpermissions">' + doI18N("administration.link.view.permissions") + '</a>';

	if (jQuery.MifosXUI.showTask("ManagePermissions") == true)
		htmlOptions += ' | <a href="unknown.html" onclick="' + maintainMakerCheckerUrl + '" id="maintainMC">' + doI18N("administration.link.maintain.makerCheckerable") + '</a>';
	
	if (jQuery.MifosXUI.showTask("ViewConfiguration") == true)
		htmlOptions += ' | <a href="unknown.html" onclick="refreshTableView(' + "'configuration'" + ');return false;" id="viewconfiguration">' + doI18N("administration.link.view.configuration") + '</a>';
	
	if (jQuery.MifosXUI.showTask("ViewAudits") == true)
		htmlOptions += ' | <a href="unknown.html" onclick="auditSearch();return false;" id="viewaudits">' + doI18N("administration.link.view.audits") + '</a>';

	if (htmlOptions > "") htmlOptions = htmlOptions.substring(3);

	$("#" + divName).html(simpleOptionsHtml(htmlOptions));
}


function setSubscriptionContent(divName) {

	
	var subscriptionUrl = "maintainTable('subscription', 'subscriptions', 'POST');return false;";
	var paymodeUrl= "maintainTable('paymode', 'paymodes', 'POST');return false;";
	var paytermsUrl= "maintainTable('paytype', 'paytypes', 'POST');return false;";
	var billingcycleUrl= "maintainTable('billingcycle', 'billingcycles', 'POST');return false;";
	var addServiceMaster="maintainTable('servicemaster', 'servicemasters', 'POST');return false;";
	var htmlVar = '<div id="inputarea"></div><div id="schedulearea"></div>'

	var htmlVar = '<div>';
	htmlVar += '<span style="float: left">';
	
	htmlVar += '	<a href="unknown.html" onclick="refreshTableView(' + "'subscription'" + ');return false;" >' + doI18N("View Subscriptions") + '</a>';
	htmlVar += ' | ';

	htmlVar += '	<a href="unknown.html" onclick="' +subscriptionUrl + '" id="subscription">' + doI18N("Add Subscription Details") + '</a>';
	
	/*htmlVar += ' | ';

	htmlVar += '	<a href="unknown.html" onclick="' +paytermsUrl + '" id="payterm">' + doI18N("administration.link.payterms") + '</a>';
	*/
	htmlVar += ' | ';

	htmlVar += '	<a href="unknown.html" onclick="addPaymode();return false;">' + doI18N("administration.link.paymode") + '</a>';
	
	htmlVar += ' | ';

//	htmlVar += '	<a href="unknown.html" onclick="' +billingcycleUrl + '" id="billingcycle">' + doI18N("administration.link.billingcycle") + '</a>';
//	htmlVar += ' | ';

//	htmlVar += '	<a href="unknown.html"  onclick="addPlan();return false;">' + doI18N("administration.link.plan") + '</a>';
//	
//	htmlVar += ' | ';
//
//	htmlVar += '	<a href="unknown.html" onclick="' +pricingUrl + '" id="pricing">' + doI18N("administration.link.price") + '</a>';
//	
//	
	//htmlVar += ' | ';
	
	 htmlVar += ' <a href="unknown.html" onclick="refreshTableView(' + "'servicemaster'" + ');return false;" >' + doI18N("Services") + '</a>';
	 
	
		
		htmlVar += ' | ';
		//htmlVar += '	<a href="unknown.html" onclick="' + addTaxMappingRate + '" id="taxMappingRate">' + doI18N("addTaxMappingRate") + '</a>';
	
	htmlVar += '	<a href="unknown.html" onclick="refreshTableView(' + "'plan'" + ');return false;" >' + doI18N("Plans & Pricing") + '</a>';
	htmlVar += ' | ';
	htmlVar += ' <a href="unknown.html" onclick="refreshTableView(' + "'item'" + ');return false;" >' + doI18N("Items") + '</a>';
	
	htmlVar += '</span>';
	htmlVar += '</div>';
	htmlVar += '<br><br>';
	htmlVar += '<div id="listplaceholder" ></div>';
	$("#" + divName).html(htmlVar);
	
	
	
};

function setAccountingContent(divName) {
	//get a list of all offices (as this is required by most accounting subtabs)
	var officesObject;
	var getOfficesSuccessFunction = function(data, textStatus, jqXHR) {
		officesObject = data;
		$("#" + divName).html($("#accountingHomeTemplate").render());
		$("#accountingtabs").tabs({
			select : function(event, tab) {
				fetchAccountingTabContent(tab.index);
			}
		});
		var fetchAccountingTabContent = function(index) {
			//journal entries tab selected
			if (index == 0) {
				handleJournalEntriesTabSelection(officesObject);
			}//accounting closures tab selecetd
			else if (index == 1) {
				handleGLClosuresTabSelection(officesObject);
			}
			//coa tab selected
			else if (index == 2) {
				handleCOATabSelection();
			}
		}
		//determine which tab is initially selected and load data for the same
		var selected = $("#accountingtabs").tabs('option', 'selected');
		fetchAccountingTabContent(selected);
	}
	executeAjaxRequest('offices', 'GET', "", getOfficesSuccessFunction, formErrorFunction);
}

function handleJournalEntriesTabSelection(officesObject) {
	// get list of all offices and accounts and initialize the screen
	var getAccountsSuccessFunction = function(data, textStatus, jqXHR) {
		var baseObject = new Object();
		baseObject.offices = officesObject;
		baseObject.accounts = data;
		var accountingClosuresTabHtml = $("#journalEntriesTemplate").render(baseObject);
		$("#journalentry-tab").html(accountingClosuresTabHtml);

		/** Account Id drop into a combo-box*/
		$("#accountId").combobox();

		/***yyyy-mm-dd format for date picker feilds***/
		$('.datepickerfieldforaccounting').datepicker({constrainInput: true, maxDate: 0, dateFormat: 'yy-mm-dd'});

		/** Onclick function for adding a new Journal Entry */
		$("#addjournalentry").button({
			icons : {
				primary : "ui-icon-circle-plus"
			}
		}).click(function(e) {
			var getUrl = "";
			var putUrl = "journalentries";
			var templateSelector = "#journalEntryFormTemplate";
			var width = 600;
			var height = 500;

			var saveSuccessFunction = function(data, textStatus, jqXHR) {
				$("#dialog-form").dialog("close");
				searchForJournalEntries();
			}
			popupDialogWithFormViewData(baseObject, putUrl, 'POST', "dialog.title.journalEntry.add", templateSelector, width, height, saveSuccessFunction);
			//initialize default comboboxes in popup
			$("#debitAccountId1").combobox();
			$("#creditAccountId1").combobox();

			//init button for adding new debits
			var debitSize = $('#debits p').size() + 1;
			$("#addDebit").button({
			icons : {
				primary : "ui-icon-plusthick"
			},
			text: false
			}).click(function(e) {
				debitSize = debitSize + 1;
				baseObject.accountId = "debitAccountId" + debitSize;
				baseObject.amountId = "debitAmount" + debitSize;
				baseObject.deleteButtonId = "removeDebitButton" + debitSize;
				baseObject.activity = "Remove this Debit Entry";
				var debitTemplateHtml = $("#singleDebitOrCreditEntryTemplate").render(baseObject);
				$("#debits").append(debitTemplateHtml);
				//onclick funtion for newly added delete button
				$("#" + baseObject.deleteButtonId).button({
				icons : {
					primary : "ui-icon-cancel"
				},
				text:false
				}).click(function(e) {
					if( debitSize > 1 ) {
                        $(this).parents('p').remove();
                        debitSize --;
               		}
                	e.preventDefault();
				});
				//make newly added select a combobox
				$("#" + baseObject.accountId).combobox();
				e.preventDefault();
			});

			//init button for adding new credits
			var creditSize = $('#credits p').size() + 1;
			$("#addCredit").button({
			icons : {
				primary : "ui-icon-plusthick"
			},
			text: false
			}).click(function(e) {
				creditSize = creditSize + 1;
				baseObject.accountId = "creditAccountId" + creditSize;
				baseObject.amountId = "creditAmount" + creditSize;
				baseObject.deleteButtonId = "removeCreditButton" + creditSize;
				baseObject.activity = "Remove this credit Entry";
				var creditTemplateHtml = $("#singleDebitOrCreditEntryTemplate").render(baseObject);
				$("#credits").append(creditTemplateHtml);
				//onclick funtion for newly added delete button
				$("#" + baseObject.deleteButtonId).button({
				icons : {
					primary : "ui-icon-cancel"
				}, 
				text:false
				}).click(function(e) {
					if( creditSize > 1 ) {
                        $(this).parents('p').remove();
                        creditSize --;
               		}
                	e.preventDefault();
				});
				//make newly added select a combobox
				$("#" + baseObject.accountId).combobox();
				e.preventDefault();
			});
			e.preventDefault();
		});

		/** On-click function for searching for GL Accounts */
		$("#searchjournalentries").button({
			icons : {
				primary : "ui-icon-search"
			}
		}).click(function(e) {
			searchForJournalEntries();
			e.preventDefault();
		});
	}
	executeAjaxRequest('glaccounts?manualAdjustmentsAllowed=true&usage=1&disabled=false', 'GET', "", getAccountsSuccessFunction, formErrorFunction);

	/** *function called on successfully fetching Journal Account details** */
	var journalEntriesFetchSuccessFunction = function(data) {
		var journalEntriesObject = new Object();
		journalEntriesObject.crudRows = data;
		var journalEntriesTablesHtml = $("#journalEntriesTableTemplate").render(journalEntriesObject);
		$("#journalentriessearchresults").html(journalEntriesTablesHtml);
		oTable = displayListTableWithExportOption("journalentriestable");

		var reverseJournalEntrySuccessFunction = function(data, textStatus, jqXHR) {
			$("#dialog-form").dialog("close");
			searchForJournalEntries();
		}
		// initialize info and reversal buttons
		$.each(journalEntriesObject.crudRows, function(i, val) {
			$("#glentryinfo" + val.id).button({
				icons : {
					primary : "ui-icon-info"
				},
				text: false
			}).click(function(e) { {
					var width = 550;
					var height = 450;
					var templateSelector = "#journalEntryInfoFormTemplate";
					popupDialogWithReadOnlyFormViewData(val,"dialog.title.journalEntry.view", templateSelector, width, height);
				}
				e.preventDefault();
			});
			// button for reversal may (would not exist for portfolio generate entries)
			if($("#glentryreversal" + val.id).length){
				$("#glentryreversal" + val.id).button({
					icons : {
						primary : "ui-icon-arrowrefresh-1-s"
					},
					text: false
				}).click(function(e) {
					var url = "journalentries/" + val.transactionId + "/reversal";
					var width = 400;
					var height = 225;

					popupConfirmationDialogAndPost(url, 'POST', 'dialog.title.confirmation.required', width, height, 0, reverseJournalEntrySuccessFunction);
					e.preventDefault();
				});
			}
		});

	};

	var searchForJournalEntries = function() {
		var officeId = $("#journalEntryOfficeId").val();
		var accountId = $("#accountId").val();
		var fromdate = $("#fromDate").val();
		var todate = $("#toDate").val();
		var getPortfolioEntries = $('#includePortfolioPostings').is(':checked');

		//populate the request substring
		var requestString = "";
		if (officeId != "") {
			requestString += "officeId=" + officeId + "&";
		}
		if (accountId != "") {
			requestString += "glAccountId=" + accountId + "&";
		}
		if (!getPortfolioEntries) {
			requestString += "portfolioGenerated=false&";
		}
		if (fromdate != undefined && fromdate != "") {
			requestString += "fromDate=" + fromdate + "&";
		}
		if (todate != undefined && todate != "") {
			requestString += "toDate=" + todate + "&";
		}

		if (requestString != "") {
			requestString = requestString.slice(0, -1)
			executeAjaxRequest('journalentries?' + requestString, 'GET', "", journalEntriesFetchSuccessFunction, formErrorFunction);
		} else{
			executeAjaxRequest('journalentries', 'GET', "", journalEntriesFetchSuccessFunction, formErrorFunction);
		}
	}
}

function handleGLClosuresTabSelection(officesObject) {
	var baseObject = new Object();
	baseObject.crudRows = officesObject;
	var accountingClosuresTabHtml = $("#glAccountClosuresTemplate").render(baseObject);
	$("#accountingclosure-tab").html(accountingClosuresTabHtml);

	/** Onclick function for adding a new Account Closure*/
	$("#addglclosure").button({
		icons : {
			primary : "ui-icon-circle-plus"
		}
	}).click(function(e) {
		var getUrl = "";
		var putUrl = "glclosures";
		var templateSelector = "#glAccountClosuresFormTemplate";
		var width = 600;
		var height = 400;

		// update currently selected div if onclick function succeeds
		var saveSuccessFunction = function(data, textStatus, jqXHR) {
			$("#dialog-form").dialog("close");
		}
		popupDialogWithFormViewData(baseObject, putUrl, 'POST', "dialog.title.glAccountClosure.add.account", templateSelector, width, height, saveSuccessFunction);
		e.preventDefault();
	});

	/** Onclick function for searching for GL Accounts */
	$("#searchglclosure").button({
		icons : {
			primary : "ui-icon-search"
		}
	}).click(function(e) {
		searchForClosures();
		e.preventDefault();
	});

	/** *function called on successfully fetching GL Closure details** */
	var glClosuresFetchSuccessFunction = function(data) {
		var glClosuresObject = new Object();
		glClosuresObject.crudRows = data;
		var accountingClosuresTablesHtml = $("#glAccountClosuresTableTemplate").render(glClosuresObject);
		$("#glaccountclosuressearchresults").html(accountingClosuresTablesHtml);
		oTable = displayListTable("closurestable");

		var editGLClosureSuccessFunction = function(data, textStatus, jqXHR) {
			$("#dialog-form").dialog("close");
			searchForClosures();
		}
		// initialize info/edit and delete buttons
		$.each(glClosuresObject.crudRows, function(i, val) {
			$("#glclosureinfo" + val.id).button({
				icons : {
					primary : "ui-icon-info"
				},
				text: false
			}).click(function(e) { {
					var width = 550;
					var height = 350;
					var templateSelector = "#glAccountClosuresInfoTemplate";
					popupDialogWithReadOnlyFormViewData(val,"dialog.title.glAccountClosure.view", templateSelector, width, height);
				}
				e.preventDefault();
			});
			$("#glclosureedit" + val.id).button({
				icons : {
					primary : "ui-icon-pencil"
				},
				text: false
			}).click(function(e) {
				var getUrl = 'glclosures/' + val.id;
				var putUrl = 'glclosures/' + val.id;
				var templateSelector = "#glAccountClosuresEditFormTemplate";
				var width = 600;
				var height = 450;

				popupDialogWithFormView(getUrl, putUrl, 'PUT', "dialog.title.glAccountClosure.edit", templateSelector, width, height, editGLClosureSuccessFunction);
				e.preventDefault();
			});
			// button for delete
			$("#glclosuredelete" + val.id).button({
				icons : {
					primary : "ui-icon-trash"
				},
				text: false
			}).click(function(e) {
				var url = "glclosures/" + val.id;
				var width = 400;
				var height = 225;

				popupConfirmationDialogAndPost(url, 'DELETE', 'dialog.title.confirmation.required', width, height, 0, editGLClosureSuccessFunction);
				e.preventDefault();
			});
		});

	};

	var searchForClosures = function() {
		var officeId = $("#accountClosuresOfficeId").val();
		if (officeId != "") {
			executeAjaxRequest('glclosures?officeId=' + officeId, 'GET', "", glClosuresFetchSuccessFunction, formErrorFunction);
		} else {
			executeAjaxRequest('glclosures', 'GET', "", glClosuresFetchSuccessFunction, formErrorFunction);
		}
	}
}


function handleCOATabSelection(){
	//render coa tab
	var coaTabHtml = $("#chartOfAccountsTemplate").render();
	$("#coa-tab").html(coaTabHtml);

	var divToUpdate;
	var oTable;

	/** *function called on successfully fetching GL Account details** */
	var glAccountsFetchSuccessFunction =  function(data) {
		var glAccountsObject = new Object();
	    glAccountsObject.crudRows = data;
	    //function called on successfully updating a GL Account
	    var editGLAccountSuccessFunction = function(data, textStatus, jqXHR) {
		  	$("#dialog-form").dialog("close");
		  	handleCOATabSelection();
		}

	    // render the data in appropriate div
		var tableHtml = $("#accountsTableTemplate").render(glAccountsObject);
		$(divToUpdate).html(tableHtml);
		oTable=displayListTable("accountstable");

	    // initialize info/edit and delete buttons
	    $.each(glAccountsObject.crudRows, function(i, val) {
			      $("#glaccountinfo" + val.id).button({icons: {
	                primary: "ui-icon-info"},
					text: false
	                }).click(function(e){
                    {
                    var width = 600;
					var height = 350;
					var templateSelector = "#glAccountsInfoFormTemplate";
					popupDialogWithReadOnlyFormViewData(val,"dialog.title.glAccount.view", templateSelector, width, height);
                    }
				    e.preventDefault();
			      });
				  $("#glaccountedit" + val.id).button({icons: {
		            primary: "ui-icon-pencil"},
					text: false
		            }).click(function(e) {
					var getUrl = 'glaccounts/'+val.id+ '?template=true';
					var putUrl = 'glaccounts/'+val.id;
					var templateSelector = "#glAccountsFormTemplate";
					var width = 600; 
					var height = 450;

					popupDialogWithFormView(getUrl, putUrl, 'PUT', "dialog.title.glAccount.edit", templateSelector, width, height,  editGLAccountSuccessFunction);
					e.preventDefault();
				  });
				  // button for delete
				  $("#glaccountdelete" + val.id).button({icons: {
		            primary: "ui-icon-trash"},
					text: false
		            }).click(function(e){
					var url = "glaccounts/"+ val.id;
					var width = 400; 
					var height = 225;

					popupConfirmationDialogAndPost(url, 'DELETE', 'dialog.title.confirmation.required', width, height, 0, editGLAccountSuccessFunction);
					e.preventDefault();
			      });
			      if($("#glaccountenable" + val.id).length){
				      $("#glaccountenable" + val.id).button({icons: {
			          primary: "ui-icon-unlocked"},
					  text: false
			          }).click(function(e){
					  var url = "glaccounts/"+ val.id;
					  var width = 400; 
					  var height = 225;
					  
					  var searializedArray= {};
					  searializedArray["disabled"]= false;
					  var jsonString =JSON.stringify(searializedArray);
					  
		
					  popupConfirmationDialogAndPost(url, 'PUT', 'dialog.title.confirmation.required', width, height, 0, editGLAccountSuccessFunction,jsonString);
					  e.preventDefault();
				      });
			      }
			      if($("#glaccountdisable" + val.id).length){
				      $("#glaccountdisable" + val.id).button({icons: {
			          primary: "ui-icon-locked"},
					  text: false
			          }).click(function(e){
					  var url = "glaccounts/"+ val.id;
					  var width = 400; 
					  var height = 225;
					  
					  var searializedArray= {};
					  searializedArray["disabled"]= true;
					  var jsonString =JSON.stringify(searializedArray);
		
					  popupConfirmationDialogAndPost(url, 'PUT', 'dialog.title.confirmation.required', width, height, 0, editGLAccountSuccessFunction,jsonString);
					  e.preventDefault();
				      });
			      }
			      
	    });

	};


	/** Onclick function for adding a new GL Account */
	$("#addglaccount").button({icons: {
	    primary: "ui-icon-circle-plus"}
	    }).click(function(e){
	  	var getUrl = 'glaccounts/template';
		var putUrl = "glaccounts";
		var templateSelector = "#glAccountsFormTemplate";
		var width = 600; 
		var height = 400;

		// update currently selected div if onclick function succeeds
		var saveSuccessFunction = function(data, textStatus, jqXHR) {
		  	$("#dialog-form").dialog("close");
		  	handleCOATabSelection();
		}

		popupDialogWithFormView(getUrl, putUrl, 'POST', "dialog.title.glAccountsFormTemplate.add.account", templateSelector, width, height,  saveSuccessFunction);
	    e.preventDefault();
	});

	/**
	 * Make a call to fetch details of appropriate GL Accounts on click of
	 * sub-tab of GL Accounts (All, ASSET, LIABILITY, EQUITY, INCOME, EXPENSES)
	 */
	$("#coatabs-main").tabs({
			select: function(event, tab) {
				/**
				 * clear previous div contents on selection change to avoid
				 * datatable refresh issue*
				 */
				$(divToUpdate).html('');
				fetchGLAccount(tab.index);
		 }
	});

	var fetchGLAccount = function (index){
		if (index == 0)
		{
			divToUpdate="#coatabs-all";
			executeAjaxRequest('glaccounts', 'GET', "", glAccountsFetchSuccessFunction, formErrorFunction);
		}
		// assets tab selected
		if (index == 1)
		{
			divToUpdate="#coatabs-asset";
			executeAjaxRequest('glaccounts?classification=1', 'GET', "", glAccountsFetchSuccessFunction, formErrorFunction);
		}
		// liabilities tab selected
		if (index == 2)
		{
			divToUpdate="#coatabs-liabilities";
			executeAjaxRequest('glaccounts?classification=2', 'GET', "", glAccountsFetchSuccessFunction, formErrorFunction);
		}
		// equity tab selected
		if (index == 3)
		{
			divToUpdate="#coatabs-equity";
			executeAjaxRequest('glaccounts?classification=3', 'GET', "", glAccountsFetchSuccessFunction, formErrorFunction);
		}
		// income tab selected
		if (index == 4)
		{
			divToUpdate="#coatabs-income";
			executeAjaxRequest('glaccounts?classification=4', 'GET', "", glAccountsFetchSuccessFunction, formErrorFunction);
		}
		// expenses tab selected
		if (index == 5)
		{
			divToUpdate="#coatabs-expenses";
			executeAjaxRequest('glaccounts?classification=5', 'GET', "", glAccountsFetchSuccessFunction, formErrorFunction);
		}
	}



	//determine which tab is initially selected and reload data for the same
	var selected = $("#coatabs-main").tabs('option', 'selected');
	fetchGLAccount(selected);
}


function setReportingContent(divName) {

	var htmlVar = '<table id=toptable>';
 	htmlVar += '<tr>';
 	htmlVar += '  <td valign="top"><div id=myListOfReports></div></td>';
 	htmlVar += '  <td width="100px"></td>';
 	htmlVar += '  <td valign="bottom">';
 	htmlVar += '		<select id=decimalsChoice onChange="selectNewDecimals(options[selectedIndex].value)" >';
 	htmlVar += '		<option value="" selected="selected">' + doI18N("reporting.decimals") + '</option>';
 	htmlVar += '		<option value="4">4</option>';
 	htmlVar += '		<option value="3">3</option>';
 	htmlVar += '		<option value="2">2</option>';
 	htmlVar += '		<option value="1">1</option>';
 	htmlVar += '		<option value="0">0</option>';
 	htmlVar += '		<option value="-1">-1</option>';
 	htmlVar += '		<option value="-2">-2</option>';
 	htmlVar += '		<option value="-3">-3</option>';
 	htmlVar += '		</select>';
 	htmlVar += '   </td>';
 	htmlVar += '  <td valign="bottom">';
 	htmlVar += '		<select id=decimalsThousandsSep onChange="selectNewThousandsSep(options[selectedIndex].value)" >';
 	htmlVar += '		<option value="" selected="selected">' + doI18N("reporting.format") + '</option>';
 	htmlVar += '		<option value=",.">1,234,567.89</option>';
 	htmlVar += '		<option value=".,">1.234.567,89</option>';
 	htmlVar += '		<option value=" ,">1 234 567,89</option>';
 	htmlVar += '		<option value=" .">1 234 567.89</option>';
 	htmlVar += '		<option value=".' + "'" + '">1.234.567' + "'" + '89</option>';
 	htmlVar += '		<option value="' + "'" + ',">1'+ "'" + '234' + "'" + '567,89</option>';
 	htmlVar += '		<option value="INDIAN">Indian 12,34,567.89</option>';
 	htmlVar += '		<option value="NONE">None 1234567.89</option>';
 	htmlVar += '		</select>';
 	htmlVar += '   </td>';
 	htmlVar += '  <td valign="top"><div id=myRunReportButton></div></td>';
 	htmlVar += '  <td valign="top"><div id=myClearReportButton></div></td>';
 	htmlVar += '  <td valign="bottom"><div id=reportOutputOptionsDiv></div></td>';
 	htmlVar += '</tr>';
 	htmlVar += '</table>';
 	htmlVar += '<div id=myInputParameters></div>';
 	htmlVar += '<div id=myOutput></div>'; 

	$("#" + divName).html(htmlVar);
}

function setAccountSettingsContent(divName) {

	var htmlVar = '<div id="tabs">';
	htmlVar += '	<ul>';
	htmlVar += '		<li><a href="#settingstab" title="settings">' + doI18N("tab.settings") + '</a></li>';
	htmlVar += '	</ul>';
	htmlVar += '	<div id="settings"></div>';
	htmlVar += '</div>';

	$("#" + divName).html(htmlVar);
}

/*
 * operationType: 	{CREATE, UPDATE, DELETE}
 * resource:    	{CLIENTS, OFFICES, etc}
 * resourceId:      	Individual id of client of office resource.
 * commandId:	Id of the maker checker entry on table
 */
function viewMakerCheckerEntry(operationType, resource, resourceId, commandId, entityHref) {

	var getUrl = resource + '/';
	
	// TODO - KW - want to use generic ui now instead of specific formTemplate for each entity.
	var templateSelector = "#clientFormTemplate";
	var width = 600; 
	var height = 350;
	switch (resource) {
		case "clients":
			templateSelector = "#clientFormTemplate"
		break;
		case "roles":
			templateSelector = "#roleFormTemplate"
		break;
	}
	
	// Note: on creates the 'get' url should have /template e.g. /clients/template
	//       on updates/deletes the 'get' url should have specific resource /clients/1?template=true
	var resourceHref = entityHref.substring(1);
	getUrl = resourceHref + "?commandId=" + commandId;
	
	popupDialogWithReadOnlyFormView(getUrl, "dialog.title.proposedchanges", templateSelector, width, height);
}

/*
 * operationType: 	{CREATE, UPDATE, DELETE}
 * entityType:    	{CLIENTS, OFFICES, etc}
 * entityId:      	Individual id of client of office resource.
 * commandSourceId:	Id of the maker checker entry on table
 */
function approveMakerCheckerEntry(operationType, entityType, entityId, commandSourceId) {

	var url = 'commands/' + commandSourceId + '?command=approve';
	var width = 400; 
	var height = 225;
	
	var onSuccessFunction = function(data) {
		$('#dialog-form').dialog("close");
		showMakerCheckerListing();
	}
								
	popupConfirmationDialogAndPost(url, 'POST', 'dialog.title.confirmation.required', width, height, 0, onSuccessFunction);
}

//all the code for the various functions
function showMakerCheckerListing() {
	
	var onMakerCheckerActionSuccessFunction = function(data) {
		$('#dialog-form').dialog("close");
		showMakerCheckerListing();
	}
	
	var onListRetrievialSuccessFunction = function(data) {
		var makerCheckerListObject = new Object();
		makerCheckerListObject.crudRows = data;
	    
		var tableHtml = "<p>Hello</p>";
		tableHtml = $("#makerCheckerListTemplate").render(makerCheckerListObject);
		
		$("#content").html(tableHtml);
		
		// register event listeners
		$("a.deletemakerchecker").click( function(e) {
			var linkId = this.id;
			
			var entityId = null;
			var makerCheckerId = linkId.replace("deletemakerchecker", "");
			
			// assumption its clients for now.
			var url = 'commands/' + makerCheckerId;
			var width = 400; 
			var height = 225;
									
			popupConfirmationDialogAndPost(url, 'DELETE', 'dialog.title.confirmation.required', width, height, 0, onMakerCheckerActionSuccessFunction);
			
			e.preventDefault();
		});
  	};

  	// fetch all maker checker entries
  	executeAjaxRequest('commands', 'GET', "", onListRetrievialSuccessFunction, formErrorFunction);
}


function showILClientListing() {

	if (jQuery.MifosXUI.showTask("clientSearch") == false)
	{
		//console.log(doI18N("client.search.not.allowed"));
		return;
	}

	setClientListingContent("content");

	//HOME list clients functionality
	$("#tabs").tabs({
	    select: function(event, ui) {
	    },
	    load: function(event, ui) {
	    },
	    show: function(event, ui) {

	    	var initClientSearch =  function() {
			//render page markup
			var tableHtml = $("#clientSearchTabTemplate").render();
			$("#searchtab").html(tableHtml);
			
			//fetch all Offices 
			var officeSearchSuccessFunction =  function(data) {
				var officeSearchObject = new Object();
			    officeSearchObject.crudRows = data;
				var tableHtml = $("#officesDropdownTemplate").render(officeSearchObject);
				$("#officesInScopeDiv").html(tableHtml);

				// add client filter behaviour
				$("#officeId").change(function(){
					applyClientSearchFilter($(this).val());
				})
		  	};
		  	executeAjaxRequest('offices', 'GET', "", officeSearchSuccessFunction, formErrorFunction);
			
			//render client drop down data
			var clientSearchSuccessFunction =  function(data) {
				var clientSearchObject = new Object();
			    clientSearchObject.crudRows = data;
				var tableHtml = $("#allClientsDropdownTemplate").render(clientSearchObject);
				$("#clientsInScopeDiv").html(tableHtml);
		  	};
			executeAjaxRequest('clients', 'GET', "", clientSearchSuccessFunction, formErrorFunction);
  			    	
    		//search client functionality
			var searchSuccessFunction =  function(data) {
				var clientSearchObject = new Object();
			    clientSearchObject.crudRows = data;
				var tableHtml = $("#clientsTableTemplate").render(clientSearchObject);
				$("#clientTableDiv").html(tableHtml);
			    var oTable=displayListTable("clientstable");
		  	};
			
			//initialize search button				
			$("#searchClientBtn").button({
				icons: {
	                primary: "ui-icon-search"
	            }
	         }).click(function(e){
	         	//get selected office
	         	var officeHierarchy = $("#officeId").val();
	         	//get search parameter
				var searchValue = $("#clientSearchInput").val();
				searchValue = searchValue.replace("'", "''");
				//office hierarchy dropdown does not appear for branch users
				var sqlSearchValue = "display_name like '%" + searchValue + "%'"; 
				if(officeHierarchy){
					executeAjaxRequest("clients?sqlSearch=" + encodeURIComponent(sqlSearchValue)+ "&underHierarchy=" + encodeURIComponent(officeHierarchy), 'GET', "", searchSuccessFunction, formErrorFunction);
				}else{
					executeAjaxRequest("clients?sqlSearch=" + encodeURIComponent(sqlSearchValue), 'GET', "", searchSuccessFunction, formErrorFunction);
				}
			   	e.preventDefault(); 
		   	});
	    };
	  	  //initialize the client search tab
		 initClientSearch();
	 }
	});

	var addClientSuccessFunction = function(data, textStatus, jqXHR) {
		  $('#dialog-form').dialog("close");
		  
		  if (data.resourceId) {
			  showILClient(data.resourceId);
		  } else {
			  showILClientListing();
		  }
	}
	
	$("#addclient").button().click(function(e) {
		var getUrl = 'clients/template';
		var postUrl = 'clients';
		var templateSelector = "#clientFormTemplate";
		var width = 600; 
		var height = 350;
		
		popupDialogWithFormView(getUrl, postUrl, 'POST', 'dialog.title.add.client', templateSelector, width, height, addClientSuccessFunction);
		
	    e.preventDefault();
	});
} // end showILClientListing

//set scope for client search
function applyClientSearchFilter(officeHierarchy) {
	//re-render client drop down data
	var clientSearchSuccessFunction =  function(data) {
		var clientSearchObject = new Object();
	    clientSearchObject.crudRows = data;
		var tableHtml = $("#allClientsDropdownTemplate").render(clientSearchObject);
		$("#clientsInScopeDiv").html(tableHtml);
	};
	var sqlSearchValue = "o.hierarchy like '"+ officeHierarchy +"%'";
	executeAjaxRequest("clients?underHierarchy=" + encodeURIComponent(officeHierarchy), 'GET', "", clientSearchSuccessFunction, formErrorFunction);
}

//HOME list groups functionality
function showILGroupListing(){

	if (jQuery.MifosXUI.showTask("groupSearch") == false)
	{
		//console.log(doI18N("group.search.not.allowed"));
		return;
	}

	setGroupListingContent("content");

	$("#tabs").tabs({
	    select: function(event, ui) {
	    },
	    load: function(event, ui) {
	    },
	    show: function(event, ui) {
			var initGroupSearch =  function() {
				//render page markup
				var tableHtml = $("#groupSearchTabTemplate").render();
				$("#searchtab").html(tableHtml);
				
				//fetch all Offices 
				var officeSearchSuccessFunction =  function(data) {
					var officeSearchObject = new Object();
				    officeSearchObject.crudRows = data;
					var tableHtml = $("#officesDropdownTemplate").render(officeSearchObject);
					$("#officesInScopeDiv").html(tableHtml);

					// add group filter behaviour
					$("#officeId").change(function(){
						applyGroupSearchFilter($(this).val());
					})
			  	};
			  	executeAjaxRequest('offices', 'GET', "", officeSearchSuccessFunction, formErrorFunction);
				
				//render group drop down data
				var groupSearchSuccessFunction =  function(data) {
					var groupSearchObject = new Object();
				    groupSearchObject.crudRows = data;
					var tableHtml = $("#allGroupsDropdownTemplate").render(groupSearchObject);
					$("#groupsInScopeDiv").html(tableHtml);
			  	};
				executeAjaxRequest('groups', 'GET', "", groupSearchSuccessFunction, formErrorFunction);
	  			
	    		//search group functionality
				var searchSuccessFunction =  function(data) {
					var groupSearchObject = new Object();
				    groupSearchObject.crudRows = data;
					var tableHtml = $("#groupsTableTemplate").render(groupSearchObject);
					$("#groupTableDiv").html(tableHtml);
				    var oTable=displayListTable("groupstable");
			  	};
				
				//initialize search button				
				$("#searchGroupBtn").button({
					icons: {
		                primary: "ui-icon-search"
		            }
		         }).click(function(e){
		         	//get selected office
		         	var officeHierarchy = $("#officeId").val();
		         	//get search parameter
					var searchValue = $("#groupSearchInput").val();
					searchValue = searchValue.replace("'", "''");
					//office hierarchy dropdown does not appear for branch users
					var sqlSearchValue = "name like '%" + searchValue + "%'"; 
					if(officeHierarchy){
						executeAjaxRequest("groups?sqlSearch=" + encodeURIComponent(sqlSearchValue)+ "&underHierarchy=" + encodeURIComponent(officeHierarchy), 'GET', "", searchSuccessFunction, formErrorFunction);
					}else{
						executeAjaxRequest("groups?sqlSearch=" + encodeURIComponent(sqlSearchValue), 'GET', "", searchSuccessFunction, formErrorFunction);
					}
				   	e.preventDefault(); 
			   	});
	    	};

	    	initGroupSearch();
	    }
	});

	var addGroupSuccessFunction = function(data, textStatus, jqXHR) {
		$('#dialog-form').dialog("close");
		showILGroup(data.resourceId);
	}
	$("#addgroup").button().click(function(e) {
		var getUrl = 'groups/template';
		var postUrl = 'groups';
		var templateSelector = "#groupFormTemplate";
		var width = 900; 
		var height = 500;
		
		popupDialogWithFormView(getUrl, postUrl, 'POST', 'dialog.title.add.group', templateSelector, width, height, addGroupSuccessFunction);
		
	    e.preventDefault();
	});
}

//set scope for group search
function applyGroupSearchFilter(officeHierarchy) {
	//re-render group drop down data
	var groupSearchSuccessFunction =  function(data) {
		var groupSearchObject = new Object();
	    groupSearchObject.crudRows = data;
		var tableHtml = $("#allGroupsDropdownTemplate").render(groupSearchObject);
		$("#groupsInScopeDiv").html(tableHtml);
	};
	var sqlSearchValue = "o.hierarchy like '"+ officeHierarchy +"%'";
	executeAjaxRequest("groups?underHierarchy=" + encodeURIComponent(officeHierarchy), 'GET', "", groupSearchSuccessFunction, formErrorFunction);
}

function showILClient(clientId) {
	var clientUrl = 'clients/' + clientId

	setClientContent("content");
	//populate main content
	var crudObject = new Object();
	var tableHtml = $("#clientImageAndActionsTemplate").render(crudObject);
	$("#clientmaintab").html(tableHtml);
	
	$newtabs = $("#newtabs").tabs({
	    	select: function(event, tab) {
				////console.log("client tab selected: " + tab.index);
				if (tab.index == 0)
				{
					if (clientDirty == true)
					{
						refreshLoanSummaryInfo(clientUrl);
						refreshNoteWidget(clientUrl);

						clientDirty = false;
					}
				}
				
				else if (tab.index == 1)
				{
					refreshClientIdentifiers(clientUrl);
				}
				else if (tab.index == 2){
					refreshClientDocuments(clientUrl);
				}
				
				else if (tab.index == 3){
					refreshClientOrders(clientUrl);
				}
				
				else if (tab.index == 4){
					refreshClientOneTimeSaleDetails(clientUrl);
					
				}
				
				else if (tab.index == 5){
					refreshClientTransacton(clientUrl);
				
				}
				
				else if (tab.index == 6){
					refreshClientbillstatments(clientUrl);
				
				}
				
				else if (tab.index == 7){
					refreshClientTicketDetails(clientUrl);
				}
				else if(tab.index == 8){
					refreshInventoryItemDetails(clientUrl);
				}
	    		},
		"add": function( event, ui ) {
				$newtabs.tabs('select', '#' + ui.panel.id);
			}
	});
	
	var errorFunction = function(jqXHR, textStatus, errorThrown, index, anchor) {
		handleXhrError(jqXHR, textStatus, errorThrown, "#formErrorsTemplate", "#formerrors");
	};
	        
	//initialize client image related buttons
	var imageFetchSuccessFunction = function(data, textStatus, jqXHR) {
		//showILClient(clientId);
		var base = 'data:image/gif;base64,';
		var url = base + data;
		$("#customerImage").attr("src",url);
	};

	var successFunction = function(data, status, xhr) {
					//do we fetch image data?
					if(data.imagePresent == true){
						executeAjaxRequestForImageDownload('clients/' + clientId + '/image', 'GET', imageFetchSuccessFunction, errorFunction);	
					}
				
	        		currentClientId = clientId;
				clientDirty = false; //intended to refresh client if some data on its display has changed e.g. loan status or notes
	        		var currentTabIndex = $newtabs.tabs('option', 'selected');
	            	var currentTabAnchor = $newtabs.data('tabs').anchors[currentTabIndex];
	            
	        		var tableHtml = $("#clientDataTabTemplate").render(data);
					$("#clienttab").html(tableHtml);
					$("#customerName").html(data.displayName);
					$("#customerOfficeName").html(data.officeName);
						$("#customerBalance").html(data.balance);
						if(data.city){
						$("#addrNum").html(data.addrNo+",");
						$("#streetName").html(data.street+",");
						$("#cityName").html(data.city+",");
						$("#stateName").html(data.state);
						$("#countryName").html(data.country+"-");
						$("#zip").html(data.zip);
						//$("#btn").html('<button id="editaddrbtn" class="editaddrbtn" >edit Address</button>');	
						//$("#btn").html('<a id="editaddrbtn" class='editaddrbtn' href='#' style='margin-right: 5px;'>Add Address</a>');
						$("#btn").html('<br/><a id="editaddrbtn" class="editaddrbtn" href=# style=margin-right: 5px; >Edit Address</a>');	
						}
						else
							{
							//$("#addbtn").html('<button id="newaddbtn" class="newaddbtn" >Add Address</button>');
							$("#addbtn").html('<br/><a id="newaddbtn" class="newaddbtn" href=# style=margin-right: 5px; >Add Address</a>');
							}
					// retrieve accounts summary info
					refreshLoanSummaryInfo(clientUrl);
					
					// bind click listeners to buttons.
					$('.deleteclientbtn').button({icons: {
               			 primary: "ui-icon-trash"}
                	}).click(function(e) {
						var url = 'clients/' + clientId;
						var width = 400; 
						var height = 225;
												
						popupConfirmationDialogAndPost(url, 'DELETE', 'dialog.title.confirmation.required', width, height, 0, saveSuccessFunctionReloadClientListing);
						e.preventDefault();
					});
					$('button.deleteclientbtn span').text(doI18N('dialog.button.delete.client'));
					
					$('.editclientbtn').button({icons: {primary: "ui-icon-pencil"}}).click(function(e) {
						var getUrl = 'clients/' + clientId + '?template=true';
						var putUrl = 'clients/' + clientId;
						var templateSelector = "#editClientFormTemplate";
						var width = 600; 
						var height = 400;
						
						var saveSuccessFunction = function(data, textStatus, jqXHR) {
						  	$("#dialog-form").dialog("close");
						  	showILClient(clientId);
						}
						
						popupDialogWithFormView(getUrl, putUrl, 'PUT', "dialog.title.edit.client", templateSelector, width, height,  saveSuccessFunction);
					    e.preventDefault();
					});
					$('button.editclientbtn span').text(doI18N('dialog.button.edit.client'));
					
					
					$(".newaddbtn").click( function(e) {

						var getUrl='address/';
				  var postUrl='address/'+clientId;
					var templateSelector = "#addressFormTemplate";
					var width = 700; 
					var height = 300;
					var saveSuccessFunction = function(data, textStatus, jqXHR) {
						$("#dialog-form").dialog("close");
						showILClient(clientId);
						

					};
					popupDialogWithFormView(getUrl,postUrl, 'POST', "Address", templateSelector, width, height,saveSuccessFunction);
					e.preventDefault();
					
					});
					
					
					$(".editaddrbtn").click( function(e) {

						var getUrl='address/template/'+clientId;
				  var postUrl='address/'+data.addrId;
					var templateSelector = "#addressFormTemplate";
					var width = 700; 
					var height = 300;
					var saveSuccessFunction = function(data, textStatus, jqXHR) {
						$("#dialog-form").dialog("close");
						showILClient(clientId);
					};
					popupDialogWithFormView(getUrl,postUrl, 'PUT', "Update Address", templateSelector, width, height,saveSuccessFunction);
					e.preventDefault();
					
					});
					
					
					 $('.newordertbtn').button({icons: {
						    primary: "ui-icon-comment"}
						  }).click(function(e) {
								
								var officeId = $(this).attr("data-planCode");
								//var fromLoanOfficerId = $(this).attr("data-fromloanofficerid");
								var getUri = 'orders/'+officeId+'/template';
								var postUrl = 'orders/' + clientId ;
								var width = 670; 
								var height = 400;
								var htmlvar=$("#allBillingFreqsDropdownTemplate");
								$("#frequencyDiv").html(htmlvar);
								
									var saveSuccessFunction = function(data, textStatus, jqXHR) {
									
									  

									  	$("#dialog-form").dialog("close");
									  	refreshClientOrders(clientUrl);
									  	
									};
									e.preventDefault();
								
									var htmlvar=$("#allBillingFreqsDropdownTemplate").render(data);
									$("#frequencyDiv").html(htmlvar);
						
								//$('#frequencyDiv').hide();
			            		$("#planCode").change(function() {
			            			
			            			removeErrors("#formerrors");
			            		  var isChecked = $('#planCode').is(':checked');
								  if(isChecked){
								 	$('#frequencyDiv').show();
								  }else{
								  	$('#frequencyDiv').hide();
								  }
								});					
									
									
									
							
					popupDialogWithFormView('orders/template', postUrl, "POST", "Orders", "#orderFormTemplate",width,height, saveSuccessFunction); 
					
					
						
						  });
						  
						   $('.newpaymentbtn').button({icons: {
               			 primary: "ui-icon-document"}
                	}).click(function(e) {
                		var getUrl ='payments/template?clientId=' + clientId;
					var postUrl = 'payments/'+clientId ;
					var templateSelector = "#paymentFormTemplate";
					var width = 580; 
					var height = 350;
					
					var saveSuccessFunction = function(data, textStatus, jqXHR) {
					  
						$("#dialog-form").dialog("close");
						showILClient(clientId);
					  
					  	//showILClient(clientId);
					  	
					};
					
				
					popupDialogWithFormView(getUrl, postUrl, 'POST', "Payments", templateSelector, width, height,saveSuccessFunction );
					e.preventDefault();
					  });
					$('button.newpaymentbtn span').text(doI18N('dialog.button.new.payment'));
					
					 $('.invoicebtn').button({icons: {
               			 primary: "ui-icon-document"}
                	}).click(function(e) {
                	
                		var postUrl = 'billingorder/'+clientId;
					var templateSelector = "#invoiceFormTemplate";
					var width = 350; 
					var height = 200;
					
					
					var saveSuccessFunction = function(data, textStatus, jqXHR) {
						 
						$("#dialog-form").dialog("close");
						showILClient(clientId);
					};
					
				
					popupDialogWithFormView("", postUrl, 'POST', "Invoicing", templateSelector, width, height,saveSuccessFunction );
					e.preventDefault();
					  });
					$('button.invoicebtn span').text(doI18N('dialog.button.new.invoice'));
					
					 $('.genpdfbtn').button({icons: {
               			 primary: "ui-icon-document"}
                	}).click(function(e) {
                		var url = 'billmaster/' + clientId;
                		var templateSelector = "#billStatementFormTemplate";
						var width = 630; 
						var height = 300;
						
						var saveSuccessFunction = function(data, textStatus, jqXHR) {
							  

							
							$("#dialog-form").dialog("close");
							$('#saveButton').button ("disable");
							refreshClientbillstatments(clientUrl);
						
						};
												
						//popupConfirmationDialogAndPost(url, 'POST', 'dialog.title.confirmation.required', width, height, 0, saveSuccessFunction);
						popupDialogWithFormView("", url, 'POST', "Bill Pdf", templateSelector, width, height,  saveSuccessFunction);
						e.preventDefault();
					});
                		
					$('button.genpdfbtn span').text(doI18N('dialog.button.new.pdf'));
					
					
					 $('.regticketbtn').button({icons: {
               			 primary: "ui-icon-document"}
                	}).click(function(e) {
                		var posturl = 'ticketmasters/' + clientId;
                		var getUrl ='ticketmasters/template';
                		var templateSelector = "#ticketmasterFormTemplate";
                		var width = 600; 
						var height = 350;
						
						var saveSuccessFunction = function(data, textStatus, jqXHR) {
							  
							$("#dialog-form").dialog("close");
							$('#saveButton').button ("disable");
							refreshClientTicketDetails(clientUrl);
						
						};
												
						//popupConfirmationDialogAndPost(url, 'POST', 'dialog.title.confirmation.required', width, height, 0, saveSuccessFunction);
						popupDialogWithFormView(getUrl, posturl, 'POST', "Ticket", templateSelector, width, height,  saveSuccessFunction);
						e.preventDefault();
					});
                		
					$('button.regticketbtn span').text(doI18N('dialog.button.new.ticket'));
					
					$('.addadjustments').button({icons: {
            			 primary: "ui-icon-comment"}
             	}).click(function(e) {
			
						var postUrl = 'adjustments/' + clientId ;
						var getUrl ='adjustments/template';
						var templateSelector = "#addadjustmentFormTemplate";
						var width = 550; 
						var height = 350;
						
						var saveSuccessFunction = function(data, textStatus, jqXHR) {
						  	$("#dialog-form").dialog("close");
						  	showILClient(clientId);
						}
						
						popupDialogWithFormView(getUrl, postUrl, 'POST', "Adjustments", templateSelector, width, height,  saveSuccessFunction);
					    e.preventDefault();
					});
					
					
					$('.newloanbtn').button({icons: {
               			 primary: "ui-icon-document"}
                	}).click(function(e) {
						addILLoan(clientId);
					    e.preventDefault();
					});
					$('button.newloanbtn span').text(doI18N('dialog.button.new.loan.application'));
					
					$('.newdepositbtn').button({icons: {
               			 primary: "ui-icon-document-b"}
                	}).click(function(e) {
						addILDeposit(clientId);
						
						//launchAddDepositAccountDialog(clientId);
						
						e.preventDefault();
					});
					$('button.newdepositbtn span').text(doI18N('dialog.button.new.deposit.application'));
					
					$('.newsavingbtn').button({icons: {
              			 primary: "ui-icon-document"}
					}).click(function(e) {
						addILSaving(clientId);
					    e.preventDefault();
					});
					$('button.newsavingbtn span').text(doI18N('dialog.button.new.saving.application'));
					
					$('.addnotebtn').button({icons: {
               			 primary: "ui-icon-comment"}
                	}).click(function(e) {
						var postUrl = 'clients/' + clientId + '/notes';
						var templateSelector = "#noteFormTemplate";
						var width = 600; 
						var height = 400;
						
						var saveSuccessFunction = function(data, textStatus, jqXHR) {
						  	$("#dialog-form").dialog("close");
						  	refreshNoteWidget('clients/' + clientId);
						}
						
						popupDialogWithFormView("", postUrl, 'POST', "dialog.title.add.note", templateSelector, width, height,  saveSuccessFunction);
					    e.preventDefault();
					});
					$('button.addnotebtn span').text(doI18N('dialog.button.add.note'));

					refreshNoteWidget(clientUrl);

					custom.showRelatedDataTableInfo($newtabs, "m_client", clientId); 
					
					$('#captureClientImage').button(
						{icons: {
	                	primary: "ui-icon-camera"},
	                	text: false
	            	}).click(function(e) {
	            		var imageUploadSuccessFunction = function(data, textStatus, jqXHR) {
	            			$("#dialog-form").dialog("close");
							$("#customerImage").attr("src",imageCanvas.toDataURL("image/jpeg"));
						};
						var templateSelector = "#clientImageWebcamFormTemplate";
						var width = 775; 
						var height = 400;
	            		popupDialogWithFormView("", 'clients/' + clientId + '/image', 'POST', "dialog.title.edit.client.image", templateSelector, width, height,  imageUploadSuccessFunction);
	            		var pos = 0; 
	            		var ctx = null; 
	            		var image = [];
	            		$('#imageCanvas').html('');
						var imageCanvas = $('#imageCanvas')[0];
     	            	ctx = imageCanvas.getContext("2d");
     	            	image = ctx.getImageData(0, 0, 320, 240);
     	            	
						saveCB = function(data) {
							var col = data.split(";");
							var img = image;
							for(var i = 0; i < 320; i++) {
								var tmp = parseInt(col[i]);
								img.data[pos + 0] = (tmp >> 16) & 0xff;
								img.data[pos + 1] = (tmp >> 8) & 0xff;
								img.data[pos + 2] = tmp & 0xff;
								img.data[pos + 3] = 0xff;
								pos+= 4;
							}
				
							if (pos >= 4 * 320 * 240) {
								ctx.putImageData(img, 0, 0);
								pos = 0;
							}
						};
						
						$("#webcam").webcam({
							width: 320,
							height: 240,
							mode: "callback",
							swffile: "jscam_canvas_only.swf",
							onTick: function() {},
							onSave: saveCB,
							onCapture: function() {
								webcam.save();
							},
							quality: 50,
							debug: function() {},
							onLoad: function() {}
						});
						
						$('#captureImage').button({icons: {
		                	primary: "ui-icon-zoomin"},
		            	}).click(function(e) {
		            		//reset position
		            		webcam.capture();
		            		e.preventDefault();
		            	});
						e.preventDefault();
					});
				
					$('#editClientImage').button(
						{icons: {
	                	primary: "ui-icon-zoomin"},
	                	text: false
	            	}).click(function(e) {
						var getUrl = '';
						var putUrl = 'clients/' + clientId + '/image';
						var templateSelector = "#clientImageUploadFormTemplate";
						var width = 600; 
						var height = 250;
						
						var saveSuccessFunction = function(data, textStatus, jqXHR) {
						  $("#dialog-form").dialog("close");
						  executeAjaxRequestForImageDownload('clients/' + clientId + '/image', 'GET', imageFetchSuccessFunction, errorFunction);
						};
						
						popupDialogWithFormView(getUrl, putUrl, 'PUT', "dialog.title.edit.client.image", templateSelector, width, height,  saveSuccessFunction);
					    e.preventDefault();
					});
					//delete client image
					$('#deleteClientImage').button({icons: {
	                	primary: "ui-icon-trash"},
	                	text: false
	            	}).click(function(e) {
					var url = 'clients/' + clientId + '/image';
					var width = 400; 
					var height = 225;
					var saveSuccessFunction = function(data, textStatus, jqXHR) {
							$("#dialog-form").dialog("close");
						  	$("#customerImage").attr("src","resources/img/client-image-placeholder.png");
					};
											
					popupConfirmationDialogAndPost(url, 'DELETE', 'dialog.title.confirmation.required', width, height, 0, saveSuccessFunction);
					
					e.preventDefault();
					});
	        };
	    
		executeAjaxRequest(clientUrl, 'GET', "", successFunction, errorFunction);
}

function refreshClientIdentifiers(clientUrl) {
		var successFunction =  function(data, textStatus, jqXHR) {
			var crudObject = new Object();
			crudObject.crudRows = data;
			var tableHtml = $("#clientIdentifiersTemplate").render(crudObject);
			$("#clientidentifiertab").html(tableHtml);
			//initialize all edit/delete buttons
				
			var editClientIdentifierSuccessFunction = function(data, textStatus, jqXHR) {
			  	$("#dialog-form").dialog("close");
			  	refreshClientIdentifiers(clientUrl);
			}
			$.each(crudObject.crudRows, function(i, val) {
			      $("#editclientidentifier" + val.id).button({icons: {
	                primary: "ui-icon-pencil"}}
	                ).click(function(e){
			      	var clientId = clientUrl.replace("clients/", "");
					var getUrl = clientUrl + '/identifiers/'+val.id+'?template=true';
					var putUrl = clientUrl + '/identifiers/'+val.id;
					var templateSelector = "#clientIdentifiersFormTemplate";
					var width = 600; 
					var height = 450;
					popupDialogWithFormView(getUrl, putUrl, 'PUT', "dialog.title.clientIdentifier.edit", templateSelector, width, height,  editClientIdentifierSuccessFunction);
				    e.preventDefault();
			      });
			     $("#deleteclientidentifier" + val.id).button({icons: {
	                primary: "ui-icon-circle-close"}
	            	}).click(function(e) {
					var url = clientUrl + '/identifiers/'+val.id;
					var width = 400; 
					var height = 225;
											
					popupConfirmationDialogAndPost(url, 'DELETE', 'dialog.title.confirmation.required', width, height, 0, editClientIdentifierSuccessFunction);
					
					e.preventDefault();
				});
				//button for add document
			   $("#addclientIdentifierdocument" + val.id).button({icons: {
                primary: "ui-icon-circle-plus"}
                }).click(function(e){
		      	var getUrl = "";
				var putUrl = "client_identifiers/"+ val.id+ '/documents';
				var templateSelector = "#clientIdentifierDocumentsFormTemplate";
				var width = 600; 
				var height = 300;
				
				var saveSuccessFunction = function(data, textStatus, jqXHR) {
				  	$("#dialog-form").dialog("close");
				  	refreshClientIdentifierDocuments(val.id);
				}
				
				popupDialogWithFormView(getUrl, putUrl, 'POST', "dialog.title.clientIdentifier.add.document", templateSelector, width, height,  saveSuccessFunction);
			    e.preventDefault();
		      });
		      //fetch the identifier documents for this identifier
		      refreshClientIdentifierDocuments(val.id);
			});			
			//associate event with add client Identity button
			$('#addclientidentifier').button({icons: {
	                primary: "ui-icon-plusthick"}
	            	}).click(function(e) {
				var clientId = clientUrl.replace("clients/", "");
				
				var getUrl = clientUrl + '/identifiers/template';
				var putUrl = clientUrl + '/identifiers';
				var templateSelector = "#clientIdentifiersFormTemplate";
				var width = 600; 
				var height = 450;
				
				var saveSuccessFunction = function(data, textStatus, jqXHR) {
				  	$("#dialog-form").dialog("close");
				  	refreshClientIdentifiers(clientUrl);
				}
				
				popupDialogWithFormView(getUrl, putUrl, 'POST', "dialog.title.clientIdentifier.add", templateSelector, width, height,  saveSuccessFunction);
			    e.preventDefault();
			});
		}
  		executeAjaxRequest(clientUrl + '/identifiers', 'GET', "", successFunction, formErrorFunction);	  	
}


function refreshClientIdentifierDocuments(clientIdentifierId) {
		var successFunction =  function(data, textStatus, jqXHR) {
			var crudObject = new Object();
			crudObject.crudRows = data;
			crudObject.clientIdentifierId	= clientIdentifierId;
			var tableHtml = $("#clientIdentifierDocumentsTemplate").render(crudObject);
			$("#clientidentifier"+clientIdentifierId+"documents").html(tableHtml);
			//initialize all edit/delete buttons
			var clientIdentifierUrl = "client_identifiers/"+ clientIdentifierId;
			var editClientIdentifierDocumentSuccessFunction = function(data, textStatus, jqXHR) {
			  	$("#dialog-form").dialog("close");
			  	refreshClientIdentifierDocuments(clientIdentifierId);
			}
			$.each(crudObject.crudRows, function(i, val) {
			      $("#editclientIdentifierdocument" + val.id).button({icons: {
	                primary: "ui-icon-pencil"},
	                text: false
	                }).click(function(e){
					var getUrl = clientIdentifierUrl + '/documents/'+val.id;
					var putUrl = clientIdentifierUrl + '/documents/'+val.id;
					var templateSelector = "#editClientIdentifierDocumentsFormTemplate";
					var width = 600; 
					var height = 300;
					popupDialogWithFormView(getUrl, putUrl, 'PUT', "dialog.title.clientIdentifier.edit.document", templateSelector, width, height,  editClientIdentifierDocumentSuccessFunction);
				    e.preventDefault();
			      });
			      $("#deleteclientIdentifierdocument" + val.id).button({icons: {
	                primary: "ui-icon-trash"},
	                text: false
	            	}).click(function(e) {
					var url = clientIdentifierUrl + '/documents/'+val.id;
					var width = 400; 
					var height = 225;
											
					popupConfirmationDialogAndPost(url, 'DELETE', 'dialog.title.confirmation.required', width, height, 0, editClientIdentifierDocumentSuccessFunction);
					
					e.preventDefault();
				});
				$("#downloadclientIdentifierdocument" + val.id).button({icons: {
	                primary: "ui-icon-arrowthickstop-1-s"},
	                text: false
	            	}).click(function(e) {
					var url = clientIdentifierUrl + '/documents/'+val.id + '/attachment';
					executeAjaxOctetStreamDownloadRequest(url);
					e.preventDefault();
				});
			});			
		}
  		executeAjaxRequest("client_identifiers/"+ clientIdentifierId + '/documents', 'GET', "", successFunction, formErrorFunction);	 
}

function refreshClientDocuments(clientUrl) {
		var successFunction =  function(data, textStatus, jqXHR) {
			var crudObject = new Object();
			crudObject.crudRows = data;
			var tableHtml = $("#clientDocumentsTemplate").render(crudObject);
			$("#clientdocumenttab").html(tableHtml);
			//initialize all edit/delete buttons
				
			var editClientDocumentSuccessFunction = function(data, textStatus, jqXHR) {
			  	$("#dialog-form").dialog("close");
			  	refreshClientDocuments(clientUrl);
			}
			$.each(crudObject.crudRows, function(i, val) {
			      $("#editclientdocument" + val.id).button({icons: {
	                primary: "ui-icon-pencil"}}
	                ).click(function(e){
			      	var clientId = clientUrl.replace("clients/", "");
					var getUrl = clientUrl + '/documents/'+val.id;
					var putUrl = clientUrl + '/documents/'+val.id;
					var templateSelector = "#editClientDocumentsFormTemplate";
					var width = 600; 
					var height = 450;
					popupDialogWithFormView(getUrl, putUrl, 'PUT', "dialog.title.client.document.edit", templateSelector, width, height,  editClientDocumentSuccessFunction);
				    e.preventDefault();
			      });
			      $("#deleteclientdocument" + val.id).button({icons: {
	                primary: "ui-icon-circle-close"}
	            	}).click(function(e) {
					var url = clientUrl + '/documents/'+val.id;
					var width = 400; 
					var height = 225;
											
					popupConfirmationDialogAndPost(url, 'DELETE', 'dialog.title.confirmation.required', width, height, 0, editClientDocumentSuccessFunction);
					
					e.preventDefault();
				});
				$("#downloadclientdocument" + val.id).button({icons: {
	                primary: "ui-icon-arrowthickstop-1-s"}
	            	}).click(function(e) {
					var url = clientUrl + '/documents/'+val.id + '/attachment';
					executeAjaxOctetStreamDownloadRequest(url);
					e.preventDefault();
				});
			});			
			//associate event with add client document button
			$('#addclientdocument').button({icons: {
	                primary: "ui-icon-plusthick"}
	            	}).click(function(e) {
				var clientId = clientUrl.replace("clients/", "");
				
				var getUrl = "";
				var putUrl = clientUrl + '/documents';
				var templateSelector = "#clientDocumentsFormTemplate";
				var width = 600; 
				var height = 450;
				
				var saveSuccessFunction = function(data, textStatus, jqXHR) {
				  	$("#dialog-form").dialog("close");
				  	refreshClientDocuments(clientUrl);
				}
				
				popupDialogWithFormView(getUrl, putUrl, 'POST', "dialog.title.client.document.add", templateSelector, width, height,  saveSuccessFunction);
			    e.preventDefault();
			});
		}
  		executeAjaxRequest(clientUrl + '/documents', 'GET', "", successFunction, formErrorFunction);	  	
}
	

function showILGroup(groupId){
	var groupUrl = "groups/"+groupId;
	setGroupContent("content");

	$newtabs = $("#newtabs").tabs({
    	select: function(event, tab) {
			if (tab.index == 0){
				if (groupDirty == true){
					refreshGroupLoanSummaryInfo(groupUrl);
					groupDirty = false;
				}
			}
		},
		"add": function( event, ui ) {
				$newtabs.tabs('select', '#' + ui.panel.id);
			}
	});

	var successFunction = function(data, status, xhr) {
		var currentGroupId = groupId;
		var currentTabIndex = $newtabs.tabs('option', 'selected');
    	var currentTabAnchor = $newtabs.data('tabs').anchors[currentTabIndex];
		var tableHtml = $("#groupDataTabTemplate").render(data);
		groupDirty = false; //intended to refresh group if some data on its display has changed e.g. loan status or notes

		$("#grouptab").html(tableHtml);
		$("#grouptabname").html(data.name);

		refreshGroupLoanSummaryInfo(groupUrl);

		// bind click listeners to buttons.
		$('.deletegroupbtn').button().click(function(e) {
			var linkId = this.id;
			var groupId = linkId.replace("deletegroupbtn", "");

			var url = 'groups/' + groupId;
			var width = 400; 
			var height = 225;
									
			popupConfirmationDialogAndPost(url, 'DELETE', 'dialog.title.confirmation.required', width, height, 0, saveSuccessFunctionReloadClientListing);
			
			e.preventDefault();
		});
		$('.editgroupbtn').button().click(function(e) {
			var linkId = this.id;
			var groupId = linkId.replace("editgroupbtn", "");
			
			var getUrl = 'groups/' + groupId + '?template=true';
			var putUrl = 'groups/' + groupId;
			var templateSelector = "#groupFormTemplate";
			var width = 900; 
			var height = 500;
			
			var saveSuccessFunction = function(data, textStatus, jqXHR) {
			  	$("#dialog-form").dialog("close");
			  	showILGroup(groupId);
			}
			
			popupDialogWithFormView(getUrl, putUrl, 'PUT', "dialog.title.edit.group", templateSelector, width, height,  saveSuccessFunction);
		    e.preventDefault();
		});
		$('.newloanbtn').button().click(function(e) {
			var linkId = this.id;
			var groupId = linkId.replace("newloanbtn", "");
			addILGroupLoan(groupId);
		    e.preventDefault();
		});
		$('button.newloanbtn span').text(doI18N('dialog.button.new.loan.application'));
		$('.newbulkloanbtn').button().click(function(e) {
			addILBulkMembersLoans(groupId, { "clientMembers" : data.clientMembers});
		    e.preventDefault();
		});
		$('button.newbulkloanbtn span').text(doI18N('dialog.button.new.members.loan.application'));
	}

	var errorFunction = function(jqXHR, status, errorThrown, index, anchor) {
    	handleXhrError(jqXHR, textStatus, errorThrown, "#formErrorsTemplate", "#formerrors");
        $(anchor.hash).html("error occured while ajax loading.");
    };

	executeAjaxRequest(groupUrl, 'GET', "", successFunction, errorFunction);
}

function addILBulkMembersLoans(groupId, clientMembers){
	setAddBulkLoanContent("content");
	var html = $("#bulkLoanApplicationFormTemplate").render(clientMembers);
	$("#selectclientsarea").html(html);	

	$('#cancelloanapp').button().click(function(e) {
		showILGroup(groupId);
	    e.preventDefault();
	});
	$('button#cancelloanapp span').text(doI18N('dialog.button.cancel'));

	$('#submitloanapp').button().click(function(e) {
		
		$('.entityform').each(function(){
			var memberLoanData = $(this).serializeObject(),
				memberLoanDataString = JSON.stringify(memberLoanData),
    			entityForm = $(this);
			
			var successFunction =  function(data, textStatus, jqXHR) {
				entityForm.closest("#client" + memberLoanData.clientId).remove();
				if ($('.entityform').length === 0){
					showILGroup(groupId);	
				}
			};
			var customFormErrorFunction = function(jqXHR, textStatus, errorThrown) {
				handleXhrError(jqXHR, textStatus, errorThrown, "#formErrorsTemplate", "#client" + memberLoanData.clientId + " .formerrors");
			};
		
			executeAjaxRequest('loans', "POST", memberLoanDataString, successFunction, customFormErrorFunction);	
		})

	    e.preventDefault();
	});
	$('button#submitloanapp span').text(doI18N('dialog.button.submit'));

	var addMemberLoanApplicationSuccess = function(data, textStatus, jqXHR) {
		data.groupId = groupId;
		var memberHtml = $("#bulkLoanApplicationMemberPartial").render(data);
		$("#membersLoanApplication").append($("<li id='client"+data.clientId+"'></li>").append(memberHtml));
		$("#client" + data.clientId + "  .productId").change(function(){
			var productId = $(this).val();
			executeAjaxRequest('loans/template?clientId=' + data.clientId + '&productId=' + productId, 'GET', "", selectMemberLoanApplicationProductSuccess, formErrorFunction);
		});
	} 

	var selectMemberLoanApplicationProductSuccess = function(data, textStatus, jqXHR) {
		data.groupId = groupId;
		var memberHtml = $("#bulkLoanApplicationMemberPartial").render(data);
		$("#membersLoanApplication > #client" + data.clientId).html(memberHtml);
		$("#client" + data.clientId + "  .productId").change(function(){
			var productId = $(this).val();
			executeAjaxRequest('loans/template?clientId=' + data.clientId + '&productId=' + productId, 'GET', "", selectMemberLoanApplicationProductSuccess, formErrorFunction);
		});
		$('.datepickerfield').datepicker({constrainInput: true, defaultDate: 0, maxDate: 0, dateFormat: 'dd MM yy'});
		$('#toggleMemberLoanDetails' + data.clientId).click(function(){
			$("#client" + data.clientId + " .memberLoanDetails").toggle();
		});
		$('#removeMemberFromApplication' + data.clientId).click(function(){
			$("#client" + data.clientId).remove();
			$(".multiNotSelectedItems option[value='" + data.clientId +"']").show();
		});
	}

	$('#addclientmembers').click(function() {  
		$('.multiNotSelectedItems option:selected').each(function(){
			executeAjaxRequest('loans/template?clientId=' + $(this).val(), 'GET', "", addMemberLoanApplicationSuccess, formErrorFunction);
		}).hide().attr("selected", false);  
	});
}

	// function to retrieve and display loan summary information in it placeholder
	function refreshLoanSummaryInfo(clientUrl) {
		var successFunction =  function(data, textStatus, jqXHR) {
				  			var tableHtml = $("#clientAccountSummariesTemplate").render(data);
				  			$("#clientaccountssummary").html(tableHtml);
			  			}
  		executeAjaxRequest(clientUrl + '/loans', 'GET', "", successFunction, formErrorFunction);	  	
	}
	
	// function to retrieve and display group loan summary information in it placeholder
	function refreshGroupLoanSummaryInfo(groupUrl) {
		var successFunction =  function(data, textStatus, jqXHR) {
  			var tableHtml = $("#groupAccountSummariesTemplate").render(data);
  			$("#groupaccountssummary").html(tableHtml);

			$('.toggleMemberLoanDetails').click(function(e){
				var memberLoanDetailsElement = $(this).next(".memberLoanDetails"),
					loanId = memberLoanDetailsElement.attr("id").replace("memberLoanDetails",""),
					showMemberLoanDetailsSuccess = function(data, textStatus, jqXHR){
						var memberLoanDetailsHtml = $("#memberLoanDetailsPartialTemplate").render(data),
			        		offsetToSubmittedDate = data.convenienceData.maxSubmittedOnOffsetFromToday,
	        				offsetToApprovalDate = data.convenienceData.maxApprovedOnOffsetFromToday,
	        				offsetToDisbursalDate = data.convenienceData.maxDisbursedOnOffsetFromToday,
	        				maxOffset = 0;
						
						memberLoanDetailsElement.html(memberLoanDetailsHtml);
						memberLoanDetailsElement.show();
						
						$('.approveloan').button().click(function(e) {
							var linkId = this.id;
							var loanId = linkId.replace("approvebtn", "");
							var postUrl = 'loans/' + loanId + '?command=approve';
							var templateSelector = "#stateTransitionLoanFormTemplate";
							var width = 500; 
							var height = 350;
							var defaultOffset = offsetToSubmittedDate;
							popupDialogWithPostOnlyFormView(postUrl, 'POST', 'dialog.title.approve.loan', templateSelector, width, height, reloadGroupLoanSummarySaveSuccessFunction(groupUrl),  offsetToSubmittedDate, defaultOffset, maxOffset)
						    e.preventDefault();
						});
						$('button.approveloan span').text(doI18N('dialog.button.approve.loan'));
							
						$('.undoapproveloan').button().click(function(e) {
							var linkId = this.id;
							var loanId = linkId.replace("undoapprovebtn", "");
							var postUrl = 'loans/' + loanId + '?command=undoapproval';
							var templateSelector = "#undoStateTransitionLoanFormTemplate";
							var width = 500; 
							var height = 350;
							var defaultOffset = offsetToSubmittedDate;
							popupDialogWithPostOnlyFormView(postUrl, 'POST', 'dialog.title.undo.loan.approval', templateSelector, width, height, reloadGroupLoanSummarySaveSuccessFunction(groupUrl), offsetToSubmittedDate, defaultOffset, maxOffset)
						    e.preventDefault();
						});
						$('button.undoapproveloan span').text(doI18N('dialog.button.undo.loan.approval'));
							
						$('.deleteloan').button().click(function(e) {
							var linkId = this.id;
							var loanId = linkId.replace("deletebtn", "");
							var url = 'loans/' + loanId;
							var width = 400; 
							var height = 225;
													
							popupConfirmationDialogAndPost(url, 'DELETE', 'dialog.title.confirmation.required', width, height, 0, reloadGroupLoanSummarySaveSuccessFunction(groupUrl));
						    e.preventDefault();
						});
						$('button.deleteloan span').text(doI18N('dialog.button.delete.loan'));
							
						$('.disburseloan').button().click(function(e) {
							var linkId = this.id;
							var loanId = linkId.replace("disbursebtn", "");
							var postUrl = 'loans/' + loanId + '?command=disburse';
							var templateSelector = "#stateTransitionLoanFormTemplate";
							var width = 500; 
							var height = 350;
							var defaultOffset = offsetToApprovalDate;
							popupDialogWithPostOnlyFormView(postUrl, 'POST', 'dialog.title.disburse.loan', templateSelector, width, height, reloadGroupLoanSummarySaveSuccessFunction(groupUrl),  offsetToSubmittedDate, defaultOffset, maxOffset)
						    e.preventDefault();
						});
						$('button.disburseloan span').text(doI18N('dialog.button.disburse.loan'));

						$('.undodisbursalloan').button().click(function(e) {
							var linkId = this.id;
							var loanId = linkId.replace("undodisbursalbtn", "");
							var postUrl = 'loans/' + loanId + '?command=undodisbursal';
							var templateSelector = "#undoStateTransitionLoanFormTemplate";
							var width = 500; 
							var height = 350;
							var defaultOffset = offsetToApprovalDate;
							popupDialogWithPostOnlyFormView(postUrl, 'POST', 'dialog.title.undo.loan.disbursal', templateSelector, width, height, reloadGroupLoanSummarySaveSuccessFunction(groupUrl),  offsetToSubmittedDate, defaultOffset, maxOffset)
						    e.preventDefault();
						});
						$('button.undodisbursalloan span').text(doI18N('dialog.button.undo.loan.disbursal'));
					};

					if (memberLoanDetailsElement.children().length > 0 ){
						memberLoanDetailsElement.toggle();
					} else {
						executeAjaxRequest('loans/' + loanId + '?associations=permissions', 'GET', "", showMemberLoanDetailsSuccess, formErrorFunction);
					}
					e.preventDefault();
			});
		}
  		executeAjaxRequest(groupUrl + '/loans', 'GET', "", successFunction, formErrorFunction);	  	
	}

	function reloadGroupLoanSummarySaveSuccessFunction(groupUrl){
		return function(data, textStatus, jqXHR) {
			$("#dialog-form").dialog("close");
			refreshGroupLoanSummaryInfo(groupUrl);
		};
	}

	function refreshNoteWidget(clientUrl) {
			  	
		if (jQuery.MifosXUI.showTask("ViewNotes") == true)
		{
			eval(genRefreshNoteWidgetSuccessVar(clientUrl));
  			executeAjaxRequest(clientUrl + '/notes', 'GET', "", successFunction, formErrorFunction);
		}
	}
	function genRefreshNoteWidgetSuccessVar(clientUrl) {

		return 'var successFunction = function(data, textStatus, jqXHR) {	' +
				  ' var noteParent = new Object();' + 
				  ' noteParent.title = doI18N("widget.notes.heading");' +
				  ' noteParent.notes = data;' +
				  ' var tableHtml = $("#noteListViewTemplate").render(noteParent);' +
				  ' $("#clienttabrightpane").html(tableHtml);' + 
				  ' $(".editclientnote").click(function(e) { ' +
						' var linkId = this.id;' +
						' var noteId = linkId.replace("editclientnotelink", "");' +
						' var getAndPutUrl = "' + clientUrl + '/notes/" + noteId;' +
						' var templateSelector = "#noteFormTemplate";' +
						' var width = 600;' +
						' var height = 400;' +
						' var saveSuccessFunction = function(data, textStatus, jqXHR) {' +
						  	' $("#dialog-form").dialog("close");' +
						  	' refreshNoteWidget("' + clientUrl + '");' +
						' };' +
						' popupDialogWithFormView(getAndPutUrl, getAndPutUrl, "PUT", "dialog.title.edit.note", templateSelector, width, height,  saveSuccessFunction);' +
					    ' e.preventDefault();' +
			      ' });' +
			  ' };'
	}
	
	function repopulateSavingAccountForm(clientId, productId){
		successFunction = function(data, textStatus, jqXHR) {
			var formHtml = $("#newDepositFormTemplate").render(data);
			
			$("#inputarea").html(formHtml);
			
			$('#productId').change(function() {
				var productId = $('#productId').val();
				repopulateSavingAccountForm(clientId, productId);
			});
			
			$('.datepickerfield').datepicker({constrainInput: true, defaultDate: 0, maxDate: 0, dateFormat: custom.datePickerDateFormat});
			$('.datepickerfieldnoconstraint').datepicker({constrainInput: true, defaultDate: 0, dateFormat: custom.datePickerDateFormat});
			
		$('#submitdepositapp').button().click(function(e) {
			submitDepositApplication(clientId);
		    e.preventDefault();
		});
		$('button#submitdepositapp span').text(doI18N('dialog.button.submit'));
		
		$('#canceldepositapp').button().click(function(e) {
  			showILClient(clientId);
		    e.preventDefault();
		});
		$('button#canceldepositapp span').text(doI18N('dialog.button.cancel'));
		}
		executeAjaxRequest('depositaccounts/template?clientId=' + clientId + '&productId=' + productId, 'GET', "", successFunction, formErrorFunction);
	}
	
	function modifyILLoan(loanId) {
		setAddLoanContent("content");
		
		var successFunction =  function(data, textStatus, jqXHR) {
			
			var clientId = data.clientId;
			
			var formHtml = $("#modifyLoanApplicationFormTemplate").render(data);
			
			$("#inputarea").html(formHtml);

			$('#productId').change(function() {
				var productId = $('#productId').val();
				// dont do anything for now when users switches product during modify
			});
			
			$('.datepickerfield').datepicker({constrainInput: true, defaultDate: 0, maxDate: 0, dateFormat: custom.datePickerDateFormat});
			$('.datepickerfieldnoconstraint').datepicker({constrainInput: true, defaultDate: 0, dateFormat: custom.datePickerDateFormat});
			
			$('#cancelloanapp').button().click(function(e) {
	  			showILClient(clientId);
			    e.preventDefault();
			});
			$('button#cancelloanapp span').text(doI18N('dialog.button.cancel'));
			
			calculateLoanSchedule();
			
			$('#modifyloanapp').button().click(function(e) {
				modifyLoanApplication(clientId, loanId);
			    e.preventDefault();
			});
			$('button#modifyloanapp span').text(doI18N('dialog.button.submit'));
			
			// attaching charges logic
			var index = 0;
			if (data["charges"]) {
				index = data["charges"].length;
			}
	  		$('#addloancharges').click(function() {  
  				var chargeId = $('#chargeOptions option:selected').val();
  				chargeId = chargeId.replace("-1", "");
  				
  				var addLoanChargeSuccess = function (chargeData) {
  					index++;
					chargeData["index"] = index;	  					
  					var loanChargeHtml = $("#addNewLoanChargeFormTemplate").render(chargeData);
  					
  					$("#selectedLoanCharges").append(loanChargeHtml);
			  		
  					$('.removeloancharges').click(function(e) {  
	  					$(this).closest('.row.charge').remove();
	  					calculateLoanSchedule();
	  					e.preventDefault();
	  				});
  					
  					$('.chargeAmount').change(function() {  
  			  			calculateLoanSchedule();
  			  		});
  					
  					$("[class*=specifiedDueDate]").change(function() {
  			  			calculateLoanSchedule();
  				  	});
  					
  					//console.log("loancharge added: datepicker support on: datepickerfieldnoconstraint");
  					$('.datepickerfieldnoconstraint').datepicker({constrainInput: true, defaultDate: 0, dateFormat: custom.datePickerDateFormat});
  					
			  		calculateLoanSchedule();
  				}
  				
  				if (chargeId) {
  					executeAjaxRequest('charges/' + chargeId + '?template=true', 'GET', "", addLoanChargeSuccess, formErrorFunction);
  				}
  				
  				e.preventDefault();
	  		});
	  		
	  		$('.removeloancharges').click(function(e) {  
	  			$(this).closest('.row.charge').remove();
	  			calculateLoanSchedule();
	  			e.preventDefault();
	  		});
	  		
	  		$('.chargeAmount').change(function() {
	  			calculateLoanSchedule();
	  		});
	  		
	  		$("[class*=specifiedDueDate]").change(function() {
	  			calculateLoanSchedule();
		  	});
	  		
			// change detection
			$('#principal').change(function() {
				calculateLoanSchedule();
			});
			
			$('#loanTermFrequency').change(function() {
				calculateLoanSchedule();
			});
			$('#loanTermFrequencyType').change(function() {
				calculateLoanSchedule();
			});
			
			$('#numberOfRepayments').change(function() {
				calculateLoanSchedule();
			});
			$('#repaymentEvery').change(function() {
				calculateLoanSchedule();
			});
			$('#repaymentFrequencyType').change(function() {
				calculateLoanSchedule();
			});
			
			$('#expectedDisbursementDate').change(function() {
				calculateLoanSchedule();
			});
			$('#repaymentsStartingFromDate').change(function() {
				calculateLoanSchedule();
			});
			
			$('#interestRatePerPeriod').change(function() {
				calculateLoanSchedule();
			});
			$('#interestRateFrequencyType').change(function() {
				calculateLoanSchedule();
			});
			$('#amortizationType').change(function() {
				calculateLoanSchedule();
			});
			$('#interestType').change(function() {
				calculateLoanSchedule();
			});
			$('#interestCalculationPeriodType').change(function() {
				calculateLoanSchedule();
			});
			$('#interestChargedFromDate').change(function() {
				calculateLoanSchedule();
			});
		};
		
		executeAjaxRequest('loans/' + loanId + '?template=true&associations=charges', 'GET', "", successFunction, formErrorFunction);	 
	}
	
	function modifyLoanApplication(clientId, loanId) {
		
		var newFormData = JSON.stringify($('#entityform').serializeObject());
    	
		var successFunction =  function(data, textStatus, jqXHR) {
			showILClient(clientId);
		};
		
		executeAjaxRequest('loans/' + loanId , "PUT", newFormData, successFunction, formErrorFunction);	  
	}
	
	function addILLoan(clientId) {
		setAddLoanContent("content");

		eval(genAddLoanSuccessVar(clientId));

  		executeAjaxRequest('loans/template?clientId=' + clientId, 'GET', "", successFunction, formErrorFunction);	  
	}

	function addILGroupLoan(groupId) {
		setAddLoanContent("content");

		eval(genAddLoanSuccessVar(null, groupId));

		executeAjaxRequest('loans/template?groupId=' + groupId, 'GET', "", successFunction, formErrorFunction);		
	}
	
	function removeLoanCharge(loanId, loanChargeId) {

		var successFunction = function(data, textStatus, jqXHR) {
			$("#dialog-form").dialog("close");
			loadILLoan(loanId);
		};

		popupConfirmationDialogAndPost('loans/' + loanId +'/charges/' + loanChargeId, 'DELETE', 'dialog.title.confirmation.required', 400, 225, 0, successFunction);

		return false;
	}
	
	function modifyLoanCharge(loanId, loanChargeId) {

		var successFunction = function(data, textStatus, jqXHR) {
			$("#dialog-form").dialog("close");
			loadILLoan(loanId);
		};
		
		var getAndPutUrl = 'loans/' + loanId +'/charges/' + loanChargeId;
		var templateSelector = "#modifyLoanChargeFormTemplate";
		var width = 400;
		var height = 250;
		
		popupDialogWithFormView(getAndPutUrl, getAndPutUrl, 'PUT', 'dialog.title.update.details', templateSelector, 400, 225, successFunction);

		return false;
	}
	
	function waiveLoanCharge(loanId, loanChargeId) {

		var successFunction = function(data, textStatus, jqXHR) {
			$("#dialog-form").dialog("close");
			loadILLoan(loanId);
		};

		popupConfirmationDialogAndPost('loans/' + loanId +'/charges/' + loanChargeId + '?command=waive', 'POST', 'dialog.title.confirmation.required', 400, 225, 0, successFunction);

		return false;
	}
	
	function genAddLoanSuccessVar(clientId, groupId) {

		return 'var successFunction = function(data, textStatus, jqXHR) { ' +
				' var formHtml = $("#newLoanFormTemplateMin").render(data);' +
				' $("#inputarea").html(formHtml);' +
				' $("#productId").change(function() {' +
					' var productId = $("#productId").val();' +
					' repopulateFullForm(' + clientId + ', ' + groupId + ', productId);' +
				' });' +
			' };'
	}

	function genSaveSuccessFunctionReloadLoan(loanId) {

		return 'var saveSuccessFunctionReloadLoan = function(data, textStatus, jqXHR) { ' + 
						  	' $("#dialog-form").dialog("close");' +
							' loadILLoan(' + loanId + ');' +
							' clientDirty = true;' +
							' groupDirty = true;' +
						'};';
	}
	
	function genSaveSuccessFunctionReloadDeposit(depositAccountId) {

		return 'var saveSuccessFunctionReloadDeposit = function(data, textStatus, jqXHR) { ' + 
						  	' $("#dialog-form").dialog("close");' +
							' loadDepositAccount(' + depositAccountId + ');' +
							' clientDirty = true;' +
						'};';
	}

	function addILDeposit(clientId) {
		setAddDepositContent("content");

		eval(genAddDepositSuccessVar(clientId));

		   executeAjaxRequest('depositaccounts/template?clientId=' + clientId, 'GET', "", successFunction, formErrorFunction);	
		}	
		function genAddDepositSuccessVar(clientId) {

		return 'var successFunction = function(data, textStatus, jqXHR) { ' +
		' var formHtml = $("#newDepositFormTemplateMin").render(data);' +
		' $("#inputarea").html(formHtml);' +
		' $("#productId").change(function() {' +
		' var productId = $("#productId").val();' +
		' repopulateDepositAccountForm(' + clientId + ', productId);' +
		' });' +
		' };'
		}
		
	
	function repopulateDepositAccountForm(clientId, productId){
		successFunction = function(data, textStatus, jqXHR) {
			var formHtml = $("#newDepositFormTemplate").render(data);
			
			$("#inputarea").html(formHtml);
			
			$('#productId').change(function() {
				var productId = $('#productId').val();
				repopulateDepositAccountForm(clientId, productId);
			});
			
			$('.datepickerfield').datepicker({constrainInput: true, defaultDate: 0, maxDate: 0, dateFormat: custom.datePickerDateFormat});
			$('.datepickerfieldnoconstraint').datepicker({constrainInput: true, defaultDate: 0, dateFormat: custom.datePickerDateFormat});
			
			$('#submitdepositapp').button().click(function(e) {
				submitDepositApplication(clientId);
			    e.preventDefault();
			});
			$('button#submitdepositapp span').text(doI18N('dialog.button.submit'));
			
			$('#canceldepositapp').button().click(function(e) {
	  			showILClient(clientId);
			    e.preventDefault();
			});
			$('button#canceldepositapp span').text(doI18N('dialog.button.cancel'));
		}
		executeAjaxRequest('depositaccounts/template?clientId=' + clientId + '&productId=' + productId, 'GET', "", successFunction, formErrorFunction);
	}	


	function repopulateFullForm(clientId, groupId, productId) {
				
		successFunction =  function(data, textStatus, jqXHR) {
			
				var formHtml = $("#newLoanFormTemplate").render(data);
			
				$("#inputarea").html(formHtml);

				$('#productId').change(function() {
					var selectedProductId = $('#productId').val();
					repopulateFullForm(clientId, groupId, selectedProductId);
				});
				
				$('.datepickerfield').datepicker({constrainInput: true, defaultDate: 0, maxDate: 0, dateFormat: custom.datePickerDateFormat});
				$('.datepickerfieldnoconstraint').datepicker({constrainInput: true, defaultDate: 0, dateFormat: custom.datePickerDateFormat});
				
				calculateLoanSchedule();
				
				// attaching charges logic
		  		var index = data["charges"].length;
		  		$('#addloancharges').click(function(e) { 
		  			
	  				var chargeId = $('#chargeOptions option:selected').val();
	  				chargeId = chargeId.replace("-1", "");
	  				
	  				var addLoanChargeSuccess = function (chargeData) {
	  					index++;
						chargeData["index"] = index;	  					
	  					var loanChargeHtml = $("#addNewLoanChargeFormTemplate").render(chargeData);
	  					
	  					$("#selectedLoanCharges").append(loanChargeHtml);
				  		
	  					$('.removeloancharges').click(function(e) {  
		  					$(this).closest('.row.charge').remove();
		  					calculateLoanSchedule();
		  					e.preventDefault();
		  				});
	  					
	  					$('.chargeAmount').change(function() {
	  			  			calculateLoanSchedule();
	  			  		});
	  					
	  					$("[class*=specifiedDueDate]").change(function() {
	  			  			calculateLoanSchedule();
	  				  	});

	  					//console.log("loancharge added: datepicker support on: datepickerfieldnoconstraint");
	  					$('.datepickerfieldnoconstraint').datepicker({constrainInput: true, defaultDate: 0, dateFormat: custom.datePickerDateFormat});
				  		
				  		calculateLoanSchedule();
	  				}
	  				
	  				if (chargeId) {
	  					executeAjaxRequest('charges/' + chargeId + '?template=true', 'GET', "", addLoanChargeSuccess, formErrorFunction);
	  				}
	  				
	  				e.preventDefault();
		  		});
		  		
		  		$('.removeloancharges').click(function(e) {  
		  			$(this).closest('.row.charge').remove();
		  			calculateLoanSchedule();
		  			e.preventDefault();
		  		});
		  		
		  		$('.chargeAmount').change(function() {  
		  			calculateLoanSchedule();
		  		});
		  		
		  		$("[class*=specifiedDueDate]").change(function() {
		  			calculateLoanSchedule();
			  	});
		  		
				// change detection
				$('#principal').change(function() {
					calculateLoanSchedule();
				});
				
				$('#loanTermFrequency').change(function() {
					calculateLoanSchedule();
				});
				$('#loanTermFrequencyType').change(function() {
					calculateLoanSchedule();
				});
				
				$('#numberOfRepayments').change(function() {
					calculateLoanSchedule();
				});
				$('#repaymentEvery').change(function() {
					calculateLoanSchedule();
				});
				$('#repaymentFrequencyType').change(function() {
					calculateLoanSchedule();
				});
				
				$('#expectedDisbursementDate').change(function() {
					calculateLoanSchedule();
				});
				$('#repaymentsStartingFromDate').change(function() {
					calculateLoanSchedule();
				});
				
				$('#interestRatePerPeriod').change(function() {
					calculateLoanSchedule();
				});
				
				$('#interestRateFrequencyType').change(function() {
					calculateLoanSchedule();
				});
				$('#amortizationType').change(function() {
					calculateLoanSchedule();
				});
				$('#interestType').change(function() {
					calculateLoanSchedule();
				});
				$('#interestCalculationPeriodType').change(function() {
					calculateLoanSchedule();
				});
				$('#interestChargedFromDate').change(function() {
					calculateLoanSchedule();
				});
				$('#submitloanapp').button().click(function(e) {
					submitLoanApplication(clientId, groupId);
				    e.preventDefault();
				});
				$('button#submitloanapp span').text(doI18N('dialog.button.submit'));
				
				$('#cancelloanapp').button().click(function(e) {
		  			if (clientId){
		  				showILClient(clientId);
		  			} else {
		  				showILGroup(groupId);
		  			}
				    e.preventDefault();
				});
				$('button#cancelloanapp span').text(doI18N('dialog.button.cancel'));
			};
		
		if (clientId){
			executeAjaxRequest('loans/template?clientId=' + clientId + '&productId=' + productId, 'GET', "", successFunction, formErrorFunction);	  
		} else {
			executeAjaxRequest('loans/template?groupId=' + groupId + '&productId=' + productId, 'GET', "", successFunction, formErrorFunction);	  
		}	  		
		

	}
	

	function calculateAnnualPercentageRate() {
		var periodInterestRate = parseFloat($('#nominalInterestRate').val());
		if (isNaN(periodInterestRate)) {
			periodInterestRate = 0;
		}
		
		var periodsInYear = 12;
		var periodType = $('#selectedInterestFrequencyOption').val();
		if (periodType == 3) {
			periodsInYear = 1;
		} else if (periodType == 2) {
			periodsInYear = 12;
		} else if (periodType == 1) {
			periodsInYear = 52;
		}
		
		var apr = parseFloat(periodsInYear * periodInterestRate);
        $('#interestRatePerYear').val(Globalize.format(apr, "n4"));
	}

	function calculateLoanSchedule() {
		
		var newFormData = JSON.stringify($('#entityform').serializeObject());
    	
		var successFunction = function(data, textStatus, jqXHR) {
				  		removeErrors("#formerrors");
				  		var loanScheduleHtml = $("#newLoanScheduleTemplate").render(data);
				  		$("#schedulearea").html(loanScheduleHtml);
		};
		
		var errorFunction = function(jqXHR, textStatus, errorThrown) {
						 $("#schedulearea").html("");
						 handleXhrError(jqXHR, textStatus, errorThrown, "#formErrorsTemplate", "#formerrors");
		};
		executeAjaxRequest('loans?command=calculateLoanSchedule', "POST", newFormData, successFunction, errorFunction);	  
	}


	function submitLoanApplication(clientId, groupId) {
		
		var newFormData = JSON.stringify($('#entityform').serializeObject());
    	
		var successFunction =  function(data, textStatus, jqXHR) {
			if (clientId){
				showILClient(clientId);
			} else {
				showILGroup(groupId);
			}
		};
		
		executeAjaxRequest('loans', "POST", newFormData, successFunction, formErrorFunction);	  

	}

	
	function submitDepositApplication(clientId) {
		
		var newFormData = JSON.stringify($('#entityform').serializeObject());
    	
		var successFunction =  function(data, textStatus, jqXHR) {
		  				showILClient(clientId);
			  };
		
		executeAjaxRequest('depositaccounts', "POST", newFormData, successFunction, formErrorFunction);	  

	}

	

	function showDepositAccount(accountId, productName) {
		var title = productName + ": #" + accountId ;			    
		$newtabs.tabs( "add", "unknown.html", title);
		loadDepositAccount(accountId);
	}
	
	function loadDepositAccount(accountId) {
		
		var accountUrl = 'depositaccounts/' + accountId + "?associations=all";

		var errorFunction = function(jqXHR, status, errorThrown, index, anchor) {
	    	handleXhrError(jqXHR, status, errorThrown, "#formErrorsTemplate", "#formerrors");
	        //$(anchor.hash).html("error occured while ajax loading.");
		};
		
		var successFunction = function(data, status, xhr) {
        	
    		var currentTabIndex = $newtabs.tabs('option', 'selected');
        	var currentTabAnchor = $newtabs.data('tabs').anchors[currentTabIndex];
        	
        	var tableHtml = $("#depositAccountDataTabTemplate").render(data);
        	
        	var data = new Object();
    		
    		var currentTab = $("#newtabs").children(".ui-tabs-panel").not(".ui-tabs-hide");
    		currentTab.html(tableHtml);

    		var curTabID = currentTab.prop("id");
    		
    		$('.rejectdepositapplication').button().click(function(e) {
				var linkId = this.id;
				var depositAccountId = linkId.replace("rejectbtn", "");
				var postUrl = 'depositaccounts/' + depositAccountId + '?command=reject';
				var getUrl = 'depositaccounts/' + depositAccountId + '?template=true';
				var templateSelector = "#stateTransitionDepositFormTemplate";
				var width = 400; 
				var height = 250;

				popupDialogWithFormView(getUrl,postUrl, 'POST', 'dialog.button.reject.depositAccount', templateSelector, width, height, saveSuccessFunctionReloadClient);
			    e.preventDefault();
			});
    		$('button.rejectdepositapplication span').text(doI18N('dialog.button.reject.depositAccount'));
    		
    		$('.approvedepositapplication').button().click(function(e) {
    			var linkId = this.id;
    			var depositAccountId = linkId.replace("approvebtn", "");
    			var postUrl = 'depositaccounts/' + depositAccountId + '?command=approve';
    			var templateSelector = "#stateTransitionDepositFormTemplateForApprove";
    			var width = 500; 
    			var height = 350;
    			var getUrl = 'depositaccounts/' + depositAccountId + '?template=true';
    			
    			eval(genSaveSuccessFunctionReloadDeposit(depositAccountId));
    			popupDialogWithFormView(getUrl, postUrl, 'POST', 'dialog.title.approve.depositAccount', templateSelector, width, height, saveSuccessFunctionReloadDeposit);
    		    
    			e.preventDefault();
    		});
    		$('button.approvedepositapplication span').text(doI18N('dialog.title.approve.depositAccount'));
    		
    		$('.withdrawinterestamount').button().click(function(e) {
				var linkId = this.id;
				var depositAccountId = linkId.replace("withdrawinterestbtn", "");
				var postUrl = 'depositaccounts/' + depositAccountId + '?command=interestwithdraw';
				var getUrl = 'depositaccounts/' + depositAccountId + '?template=true';
				var templateSelector = "#withdrawInterestFormTemplate";
				var width = 400; 
				var height = 250;

				eval(genSaveSuccessFunctionReloadDeposit(depositAccountId));
				popupDialogWithFormView(getUrl, postUrl, 'POST', 'dialog.title.withdraw.interest.amount', templateSelector, width, height, saveSuccessFunctionReloadDeposit);
				e.preventDefault();
			});
    		$('button.withdrawinterestamount span').text(doI18N('label.withdraw.interest.amount'));

			$('.printpdf').button().click(function(e) {
				var linkId = this.id;
				var depositAccountId = linkId.replace("printbtn", "");
				var getUrl = 'depositaccounts/' + depositAccountId + '/print';
				
				executeAjaxOctetStreamDownloadRequest(getUrl);
			//	//console.log("Please close the pdf file after download or print finished");
				e.preventDefault();
			});
    		$('button.printpdf span').text(doI18N('label.print.fd.account.details'));
			
    		
    		$('.renewdepositaccount').button().click(function(e) {
				var linkId = this.id;
				var depositAccountId = linkId.replace("renewbtn", "");
				var postUrl = 'depositaccounts/' + depositAccountId + '?command=renew';
				var getUrl = 'depositaccounts/' + depositAccountId + '?template=true';
				var templateSelector = "#renewDepositFormTemplate";
				var width = 850; 
				var height = 450;

				eval(genSaveSuccessFunctionReloadDeposit(depositAccountId));
				popupDialogWithFormView(getUrl, postUrl, 'POST', 'dialog.title.renew.deposit.account', templateSelector, width, height, saveSuccessFunctionReloadClient);
				e.preventDefault();
			});
    		$('button.renewdepositaccount span').text(doI18N('label.renew.deposit.account'));
    		
    		$('.withdrawdepositamount').button().click(function(e) {
				var linkId = this.id;
				var depositAccountId = linkId.replace("withdrawbtn", "");
				var postUrl = 'depositaccounts/' + depositAccountId + '?command=withdrawal';
				var getUrl = 'depositaccounts/' + depositAccountId + '?template=true';
				var templateSelector = "#withdrawAmountFormTemplate";
				var width = 400; 
				var height = 280;

				eval(genSaveSuccessFunctionReloadDeposit(depositAccountId));
				popupDialogWithFormView(getUrl, postUrl, 'POST', 'dialog.title.withdraw.deposit.amount', templateSelector, width, height, saveSuccessFunctionReloadDeposit);
			    
				e.preventDefault();
			});
    		$('button.withdrawdepositamount span').text(doI18N('label.withdraw.deposit.amount'));
 
			$('.modifydepositapplication').button().click(function(e) {
				var linkId = this.id;
				var depositAccountId = linkId.replace("modifydepositbtn", "");
				var postUrl = 'depositaccounts/' + depositAccountId;
				var getUrl = 'depositaccounts/' + depositAccountId + '?template=true';
				var templateSelector = "#modifyDepositApplicationFormTemplate";
				var width = 850; 
				var height = 450;

				eval(genSaveSuccessFunctionReloadDeposit(depositAccountId));
				popupDialogWithFormView(getUrl, postUrl, 'PUT', 'dialog.title.edit.deposit.account', templateSelector, width, height, saveSuccessFunctionReloadDeposit);
			    
				e.preventDefault();
			});
    		$('button.modifydepositapplication span').text(doI18N('label.modify.deposit.account'));
    		
    		$('.modifyapproveddepositapplication').button().click(function(e) {
				var linkId = this.id;
				var depositAccountId = linkId.replace("modifyapproveddepositbtn", "");
				var postUrl = 'depositaccounts/' + depositAccountId;
				var getUrl = 'depositaccounts/' + depositAccountId + '?template=true&?associations=all';
				var templateSelector = "#modifyApprovedDepositApplicationFormTemplate";
				var width = 400; 
				var height = 250;

				eval(genSaveSuccessFunctionReloadDeposit(depositAccountId));
				popupDialogWithFormView(getUrl, postUrl, 'PUT', 'dialog.title.edit.deposit.account', templateSelector, width, height, saveSuccessFunctionReloadDeposit);
			    
				e.preventDefault();
			});
    		$('button.modifyapproveddepositapplication span').text(doI18N('label.modify.deposit.account'));

    		
    		$('.undoapprovedepositapplication').button().click(function(e) {
				var linkId = this.id;
				var depositAccountId = linkId.replace("undoapprovebtn", "");
				var postUrl = 'depositaccounts/' + depositAccountId + '?command=undoapproval';
				var templateSelector = "#undoStateTransitionLoanFormTemplate";
				var width = 450; 
				var height = 260;

				eval(genSaveSuccessFunctionReloadDeposit(depositAccountId));
				popupDialogWithPostOnlyFormView(postUrl, 'POST', 'dialog.title.undo.deposit.approval', templateSelector, width, height, saveSuccessFunctionReloadDeposit);
			    
				e.preventDefault();
			});
    		$('button.undoapprovedepositapplication span').text(doI18N('label.undo.approval'));
    		
    		$('.withdrawnbyapplicant').button().click(function(e) {
				var linkId = this.id;
				var depositAccountId = linkId.replace("withdrawnbyapplicantbtn", "");
				var getUrl = 'depositaccounts/' + depositAccountId + '?template=true';
				var postUrl = 'depositaccounts/' + depositAccountId + '?command=withdrewbyclient';
				var templateSelector = "#stateTransitionDepositFormTemplate";
				var width = 400; 
				var height = 250;

				popupDialogWithFormView(getUrl,postUrl, 'POST', 'dialog.title.loan.withdrawn.by.client', templateSelector, width, height, saveSuccessFunctionReloadClient);
			    e.preventDefault();
			});
    		$('button.withdrawnbyapplicant span').text(doI18N('dialog.title.loan.withdrawn.by.client'));
    		
    		$('.deletedepositapplication').button().click(function(e) {
				var linkId = this.id;
				var depositAccountId = linkId.replace("deletebtn", "");
				var url = 'depositaccounts/' + depositAccountId;
				var width = 400; 
				var height = 225;
										
				popupConfirmationDialogAndPost(url, 'DELETE', 'dialog.title.confirmation.required', width, height, 0, saveSuccessFunctionReloadClient);
			    e.preventDefault();
		});
		$('button.deletedepositapplication span').text(doI18N('dialog.button.delete.loan'));
		};
		
		executeAjaxRequest(accountUrl, 'GET', "", successFunction, errorFunction);	
	}
	


function showILLoan(loanId, product, loanAccountNo) {
	var newLoanTabId='loan'+loanId+'tab';
	//show existing tab if this Id is already present
	if(tabExists(newLoanTabId)){
		var index = $('#newtabs a[href="#'+ newLoanTabId +'"]').parent().index(); 
		$('#newtabs').tabs('select', index);
		
		var title = product + ": #" + loanAccountNo;		
		if (undefined === loanAccountNo) {
			title = product + ": #" + loanId;
		}
		$('#newtabs .ui-tabs-selected:first a').text(title);
	}
	//else create new tab and set identifier properties
	else{
		var title = product + ": #" + loanAccountNo;		
		if (undefined === loanAccountNo) {
			title = product + ": #" + loanId;
		}
		$newtabs.tabs( "add", "unknown.html", title);
		loadILLoan(loanId);
		//add ids and titles to newly added div's and a'hrefs
		var lastAHref=$('#newtabs> ul > li:last > a');
		var lastDiv=$('#newtabs > div:last')
		var lastButOneDiv=$('#newtabs > div:last').prev();
		lastAHref.attr('href','#loan'+loanId+'tab');
		lastButOneDiv.attr('id',newLoanTabId);
		//the add functionality seems to be adding a dummy div at the end 
		//am deleting the same to make div manipulation easier
		lastDiv.remove();
	}
}

//checks for existence of tab with given Id
function tabExists(tabId){
    var tabFound = false;
    $('#newtabs > div').each(function(index, ui) {
        if($(ui).attr('id') == tabId){
        	tabFound = true;
        }
    });
    return tabFound;
}


function loadILLoan(loanId) {
	
	var loanUrl = 'loans/' + loanId + "?associations=all";

	var errorFunction = function(jqXHR, status, errorThrown, index, anchor) {
	        	handleXhrError(jqXHR, status, errorThrown, "#formErrorsTemplate", "#formerrors");
	};

	var successFunction = function(data, status, xhr) {
	        	
	        		var currentTabIndex = $newtabs.tabs('option', 'selected');
	            	var currentTabAnchor = $newtabs.data('tabs').anchors[currentTabIndex];
	            
	            	var offsetToSubmittedDate = 0;
	            	var offsetToApprovalDate = 0;
	            	var offsetToDisbursalDate = 0;
	            	var maxOffset = 0; // today


	        		var tableHtml = $("#loanDataTabTemplate").render(data);
	        		
	        		var currentTab = $("#newtabs").children(".ui-tabs-panel").not(".ui-tabs-hide");
	        		currentTab.html(tableHtml);

	        		var curTabID = currentTab.prop("id")
	        		
	        		offsetToSubmittedDate = data.convenienceData.maxSubmittedOnOffsetFromToday;
	        		offsetToApprovalDate = data.convenienceData.maxApprovedOnOffsetFromToday;
	        		offsetToDisbursalDate = data.convenienceData.maxDisbursedOnOffsetFromToday;
	        		 
	        		//adding styles for vertical sub-tabs
	        		//$( ".loantabs" ).tabs().addClass( "ui-tabs-vertical ui-helper-clearfix" );
	        		//$( ".loantabs li" ).removeClass( "ui-corner-top" ).addClass( "ui-corner-left" );
	        		//var $loantabs = $(".loantabs").tabs({
		        	var $loantabs = $("#loantabs" + loanId).tabs({
						"show": function(event, ui) {
							var curTab = $('#newtabs .ui-tabs-panel:not(.ui-tabs-hide)');
			      			var curTabID = curTab.prop("id")
						},
						"select": function( event, ui ) {
        					if($(ui.panel).attr( 'id' ) == ( "loanDocuments"+ loanId )){
        						refreshLoanDocuments(loanId)
        					}
   						}
					});
	        		
	        	$('.rejectloan').button().click(function(e) {
					var linkId = this.id;
					var loanId = linkId.replace("rejectbtn", "");
					var postUrl = 'loans/' + loanId + '?command=reject';
					var templateSelector = "#stateTransitionLoanFormTemplate";
					var width = 500; 
					var height = 350;
					var defaultOffset = offsetToSubmittedDate;
	
					popupDialogWithPostOnlyFormView(postUrl, 'POST', 'dialog.title.reject.loan', templateSelector, width, height, saveSuccessFunctionReloadClient, offsetToSubmittedDate, defaultOffset, maxOffset);
				    e.preventDefault();
				});
	        	$('button.rejectloan span').text(doI18N('button.application.reject'));
					
				$('.withdrawnbyapplicantloan').button().click(function(e) {
						var linkId = this.id;
						var loanId = linkId.replace("withdrawnbyapplicantloanbtn", "");
						var postUrl = 'loans/' + loanId + '?command=withdrewbyclient';
						var templateSelector = "#stateTransitionLoanFormTemplate";
						var width = 500; 
						var height = 350;
						var defaultOffset = offsetToSubmittedDate;
						popupDialogWithPostOnlyFormView(postUrl, 'POST', 'dialog.title.loan.withdrawn.by.client', templateSelector, width, height, saveSuccessFunctionReloadClient,  offsetToSubmittedDate, defaultOffset, maxOffset)
					    e.preventDefault();
				});
				$('button.withdrawnbyapplicantloan span').text(doI18N('button.application.withdrawnByApplicant'));
				
				$('.modifyloan').button().click(function(e) {
					var linkId = this.id;
					var loanId = linkId.replace("modifybtn", "");
					modifyILLoan(loanId);
				    e.preventDefault();
				});
				$('button.approveloan span').text(doI18N('button.application.modify'));
					
				$('.approveloan').button().click(function(e) {
						var linkId = this.id;
						var loanId = linkId.replace("approvebtn", "");
						var postUrl = 'loans/' + loanId + '?command=approve';
						var templateSelector = "#stateTransitionLoanFormTemplate";
						var width = 500; 
						var height = 350;
						var defaultOffset = offsetToSubmittedDate;
						eval(genSaveSuccessFunctionReloadLoan(loanId));
						popupDialogWithPostOnlyFormView(postUrl, 'POST', 'dialog.title.approve.loan', templateSelector, width, height, saveSuccessFunctionReloadLoan,  offsetToSubmittedDate, defaultOffset, maxOffset)
					    e.preventDefault();
				});
				$('button.approveloan span').text(doI18N('button.application.approve'));
					
				$('.undoapproveloan').button().click(function(e) {
						var linkId = this.id;
						var loanId = linkId.replace("undoapprovebtn", "");
						var postUrl = 'loans/' + loanId + '?command=undoapproval';
						var templateSelector = "#undoStateTransitionLoanFormTemplate";
						var width = 500; 
						var height = 350;
						var defaultOffset = offsetToSubmittedDate;
						eval(genSaveSuccessFunctionReloadLoan(loanId));
						popupDialogWithPostOnlyFormView(postUrl, 'POST', 'dialog.title.undo.loan.approval', templateSelector, width, height, saveSuccessFunctionReloadLoan, offsetToSubmittedDate, defaultOffset, maxOffset)
					    e.preventDefault();
				});
				$('button.undoapproveloan span').text(doI18N('button.application.undoApproval'));
					
				$('.deleteloan').button().click(function(e) {
					var linkId = this.id;
					var loanId = linkId.replace("deletebtn", "");
					var url = 'loans/' + loanId;
					var width = 400; 
					var height = 225;
											
					popupConfirmationDialogAndPost(url, 'DELETE', 'dialog.title.confirmation.required', width, height, 0, saveSuccessFunctionReloadClient);
				    e.preventDefault();
				});
				$('button.deleteloan span').text(doI18N('button.application.delete'));
					
				$('.disburseloan').button().click(function(e) {
					var linkId = this.id;
					var loanId = linkId.replace("disbursebtn", "");
					var postUrl = 'loans/' + loanId + '?command=disburse';
					var templateSelector = "#stateTransitionLoanFormTemplate";
					var width = 500; 
					var height = 350;
					var defaultOffset = offsetToApprovalDate;
					eval(genSaveSuccessFunctionReloadLoan(loanId));
					popupDialogWithPostOnlyFormView(postUrl, 'POST', 'dialog.title.disburse.loan', templateSelector, width, height, saveSuccessFunctionReloadLoan,  offsetToSubmittedDate, defaultOffset, maxOffset)
				    e.preventDefault();
				});
				$('button.disburseloan span').text(doI18N('button.loan.disburse'));
					
				$('.undodisbursalloan').button().click(function(e) {
					var linkId = this.id;
					var loanId = linkId.replace("undodisbursalbtn", "");
					var postUrl = 'loans/' + loanId + '?command=undodisbursal';
					var templateSelector = "#undoStateTransitionLoanFormTemplate";
					var width = 500; 
					var height = 350;
					var defaultOffset = offsetToApprovalDate;
					eval(genSaveSuccessFunctionReloadLoan(loanId));
					popupDialogWithPostOnlyFormView(postUrl, 'POST', 'dialog.title.undo.loan.disbursal', templateSelector, width, height, saveSuccessFunctionReloadLoan,  offsetToSubmittedDate, defaultOffset, maxOffset)
				    e.preventDefault();
				});
				$('button.undodisbursalloan span').text(doI18N('button.loan.undoDisbursal'));
					
				$('.repaymentloan').button().click(function(e) {
					var linkId = this.id;
					var loanId = linkId.replace("repaymentbtn", "");
					var getUrl = 'loans/' + loanId + '/transactions/template?command=repayment';
					var postUrl = 'loans/' + loanId + '/transactions?command=repayment';
					
					var templateSelector = "#transactionLoanFormTemplate";
					var width = 500; 
					var height = 350;
					var defaultOffset = offsetToApprovalDate;
					eval(genSaveSuccessFunctionReloadLoan(loanId));
		
					popupDialogWithFormView(getUrl, postUrl, 'POST', "dialog.title.loan.repayment", templateSelector, width, height,  saveSuccessFunctionReloadLoan);
				    e.preventDefault();
				});
				$('button.repaymentloan span').text(doI18N('button.loan.repayment'));
					
				$('.waiveinterestloan').button().click(function(e) {
						var linkId = this.id;
						var loanId = linkId.replace("waiveinterestbtn", "");
						
						var getUrl = 'loans/' + loanId + '/transactions/template?command=waiveinterest';
						var postUrl = 'loans/' + loanId + '/transactions?command=waiveinterest';
						
						var templateSelector = "#transactionLoanFormTemplate";
						var width = 500; 
						var height = 350;
						var defaultOffset = offsetToApprovalDate;
						
						eval(genSaveSuccessFunctionReloadLoan(loanId));
						
						popupDialogWithFormView(getUrl, postUrl, 'POST', "dialog.title.waive.loan", templateSelector, width, height, saveSuccessFunctionReloadLoan);
					    e.preventDefault();
				});
				$('button.waiveloan span').text(doI18N('button.loan.waiveInterest'));
				
				$('.writeoffloan').button().click(function(e) {
					var linkId = this.id;
					var loanId = linkId.replace("writeoffbtn", "");
					
					var getUrl = 'loans/' + loanId + '/transactions/template?command=writeoff';
					var postUrl = 'loans/' + loanId + '/transactions?command=writeoff';
					
					var templateSelector = "#loanTransactionWriteOffFormTemplate";
					var width = 500;
					var height = 350;
					var defaultOffset = offsetToApprovalDate;
					
					eval(genSaveSuccessFunctionReloadLoan(loanId));
					
					popupDialogWithFormView(getUrl, postUrl, 'POST', "dialog.title.writeoff.loan", templateSelector, width, height, saveSuccessFunctionReloadLoan);
				    e.preventDefault();
				});
				$('button.writeoffloan span').text(doI18N('button.loan.writeOff'));
				
				$('.closeasrescheduledloan').button().click(function(e) {
					var linkId = this.id;
					var loanId = linkId.replace("closeasrescheduledbtn", "");
					
					var getUrl = 'loans/' + loanId + '/transactions/template?command=close-rescheduled';
					var postUrl = 'loans/' + loanId + '/transactions?command=close-rescheduled';
					
					var templateSelector = "#loanTransactionWriteOffFormTemplate";
					var width = 500;
					var height = 350;
					var defaultOffset = offsetToApprovalDate;
					
					eval(genSaveSuccessFunctionReloadLoan(loanId));
					
					popupDialogWithFormView(getUrl, postUrl, 'POST', "dialog.title.closeasrescheduledloan.loan", templateSelector, width, height, saveSuccessFunctionReloadLoan);
				    e.preventDefault();
				});
				$('button.closeasrescheduledloan span').text(doI18N('button.loan.closeAsRescheduled'));
				
				$('.closeloan').button().click(function(e) {
					var linkId = this.id;
					var loanId = linkId.replace("closebtn", "");
					
					var getUrl = 'loans/' + loanId + '/transactions/template?command=close';
					var postUrl = 'loans/' + loanId + '/transactions?command=close';
					
					var templateSelector = "#loanTransactionWriteOffFormTemplate";
					var width = 500;
					var height = 350;
					var defaultOffset = offsetToApprovalDate;
					
					eval(genSaveSuccessFunctionReloadLoan(loanId));
					
					popupDialogWithFormView(getUrl, postUrl, 'POST', "dialog.title.close.loan", templateSelector, width, height, saveSuccessFunctionReloadLoan);
				    e.preventDefault();
				});
				$('button.closeloan span').text(doI18N('button.loan.close'));
					
				$('.adjustloanrepayment').button().click(function(e) {
					var linkId = this.id;
					var loanAndRepaymentId = linkId.replace("adjustrepaymentbtn", "");
					var ids = loanAndRepaymentId.split("_");
					var loanId = ids[0];
					var transactionId = ids[1];
					var getAndPostUrl = 'loans/' + loanId + '/transactions/' + transactionId;
					
					var templateSelector = "#transactionLoanFormTemplate";
					var width = 500; 
					var height = 350;
					var defaultOffset = offsetToApprovalDate;

					eval(genSaveSuccessFunctionReloadLoan(loanId));						
					popupDialogWithFormView(getAndPostUrl, getAndPostUrl, 'POST', "dialog.title.adjust.loan.repayment", templateSelector, width,  height, saveSuccessFunctionReloadLoan);
				    e.preventDefault();
				});
				$('button.adjustloanrepayment span').text(doI18N('button.loanTransaction.adjust'));
				
				$('.addloancharge').button().click(function(e){
						var linkId = this.id;
						var loanId = linkId.replace("addloanchargebtn", "");
						var postUrl = 'loans/' + loanId + '/charges';
						var getUrl = 'loans/' + loanId + '/charges/template';

						var templateSelector = "#loanChargeFormTemplate";
						var width = 450; 
						var height = 300;

						eval(genSaveSuccessFunctionReloadLoan(loanId));
						popupDialogWithFormView(getUrl, postUrl, 'POST', "dialog.title.addLoanCharge", templateSelector, width,  height, saveSuccessFunctionReloadLoan);
					    e.preventDefault();
				});
				$('button.addloancharge span').text(doI18N('button.addLoanCharge'));
				
				//Guarantor for loan functionality
				$('.setguarantor').button(
						{icons: {
	                	primary: "ui-icon-link"},
	            	}).click(function(e) {
						var linkId = this.id;
						var loanId = linkId.replace("setGuarantorbtn", "");
						var postUrl = 'guarantors';
						
						var templateSelector = "#guarantorFormTemplate";
						var width = 600; 
						var height = 350;
						
						
						eval(genSaveSuccessFunctionReloadLoan(loanId));
						
	            		popupDialogWithFormView("", postUrl, 'POST', "dialog.title.edit.client.image", templateSelector, width, height,  saveSuccessFunctionReloadLoan);
	            		
	            		//update hidden loan Id
	            		$("#guaranteedLoanId").val(loanId);
	            		//initially hide external guarantor div
	            		$('#externalGuarantorDiv').hide();
	            		$("#internalGuarantorCheckbox").change(function() {
	            		  var isChecked = $('#internalGuarantorCheckbox').is(':checked')
						  if(isChecked){
						 	$('#internalGuarantorDiv').show();
						  	$('#externalGuarantorDiv').hide();
						  }else{
						  	$('#internalGuarantorDiv').hide();
						  	$('#externalGuarantorDiv').show();
						  }
						});
	            		
				        $( "#smartGuarantorSearch" ).autocomplete({
				            source: function(request, response){
				            	//get selected office
								var sqlSearchValue = "display_name like '%" + request.term + "%'"; 
								smartSearchSuccessFunction =  function(data, textStatus, jqXHR) {
									response( $.map( data, function( item ) {
			                            return {
			                                label: item.displayName + "(" + item.officeName + ")",
			                                value: item.displayName,
			                                joinedDate: item.joinedDate,
			                                id: item.id,
			                                branchName:item.officeName
			                            }
			                        }));
						  		};
								executeAjaxRequest("clients?sqlSearch=" + encodeURIComponent(sqlSearchValue), 'GET', "", smartSearchSuccessFunction, formErrorFunction);
							   	e.preventDefault(); 
				            },
				            minLength: 3,
				            select: function( event, ui ) {
				                $( "#selectedGuarantorName" ).val(ui.item.value);
				                $( "#selectedGuarantorBranch" ).val(ui.item.branchName);
				                $( "#selectedGuarantorJoinedDate" ).val(custom.helperFunctions.globalDate(ui.item.joinedDate));
				                $( "#selectedGuarantorIdentifier" ).val(ui.item.id);
				                return false;
				            }
				        });
        
	            		e.preventDefault();
	            });
	            
	            //remove guarantor buttons
	            if(data.guarantors !=null){
		            $.each(data.guarantors, function(i, val) {
		            	$('#removeguarantor'+val.id).button(
							{icons: {
		                	primary: "ui-icon-trash"},
		                	text: false
		            	}).click(function(e) {
							var deleteUrl = 'guarantors/' + val.id;
							var width = 500; 
							var height = 350;
							eval(genSaveSuccessFunctionReloadLoan(loanId));
							popupConfirmationDialogAndPost(deleteUrl, 'DELETE', 'dialog.title.confirmation.required', width, height, 0, saveSuccessFunctionReloadLoan);
		            		e.preventDefault();
		            	});
				    });
			    }
	            
				$('.assignloanofficer').button().click(function(e){

						var linkId = this.id;
						var loanId = linkId.replace("assignloanofficerbtn", "");
						var postUrl = 'loans/' + loanId + '/assign';
						var getUrl = 'loans/' + loanId + '/assign/template';

						var templateSelector = "#loanReassignmentFormTemplate";
						var width = 425; 
						var height = 225;

						eval(genSaveSuccessFunctionReloadLoan(loanId));
						popupDialogWithFormView(getUrl, postUrl, 'POST', "dialog.title.assign.loan.officer", templateSelector, width,  height, saveSuccessFunctionReloadLoan);
					    e.preventDefault();
				});
				$('button.assignloanofficer span').text(doI18N('button.assignLoanOfficer'));

				$('.editaccountnobtn').button().click(function(e){

					var linkId = this.id;
					var loanId = linkId.replace("editaccountnobtn", "");
					var putUrl = 'loans/' + loanId;
					var getUrl = 'loans/' + loanId;

					var templateSelector = "#editAccountNoFormTemplate";
					var width = 425; 
					var height = 225;

					eval(genSaveSuccessFunctionReloadLoan(loanId));
					popupDialogWithFormView(getUrl, putUrl, 'PUT', "dialog.title.edit.accountno", templateSelector, width,  height, saveSuccessFunctionReloadLoan);
				    e.preventDefault();
				});
				$('button.editaccountnobtn span').text(doI18N('link.action.edit'));
				
				custom.showRelatedDataTableInfo($loantabs, "m_loan", loanId); 

				//also fetch loan documents for this loan
				refreshLoanDocuments(loanId);
	        };
	    
		executeAjaxRequest(loanUrl, 'GET', "", successFunction, errorFunction);	  
		
}


function refreshLoanDocuments(loanId) {
		var successFunction =  function(data, textStatus, jqXHR) {
			var crudObject = new Object();
			crudObject.crudRows = data;
			crudObject.loanId	= loanId;
			var tableHtml = $("#loanDocumentsTemplate").render(crudObject);
			$("#loanDocuments"+loanId).html(tableHtml);
			//initialize all edit/delete buttons
			var loanUrl = "loans/"+ loanId;
			var editLoanDocumentSuccessFunction = function(data, textStatus, jqXHR) {
			  	$("#dialog-form").dialog("close");
			  	refreshLoanDocuments(loanId);
			}
			$.each(crudObject.crudRows, function(i, val) {
			      $("#editloandocument" + val.id).button({icons: {
	                primary: "ui-icon-pencil"}}
	                ).click(function(e){
			      	
					var getUrl = loanUrl + '/documents/'+val.id;
					var putUrl = loanUrl + '/documents/'+val.id;
					var templateSelector = "#editLoanDocumentsFormTemplate";
					var width = 600; 
					var height = 450;
					popupDialogWithFormView(getUrl, putUrl, 'PUT', "dialog.title.loan.document.edit", templateSelector, width, height,  editLoanDocumentSuccessFunction);
				    e.preventDefault();
			      });
			      $("#deleteloandocument" + val.id).button({icons: {
	                primary: "ui-icon-circle-close"}
	            	}).click(function(e) {
					var url = loanUrl + '/documents/'+val.id;
					var width = 400; 
					var height = 225;
											
					popupConfirmationDialogAndPost(url, 'DELETE', 'dialog.title.confirmation.required', width, height, 0, editLoanDocumentSuccessFunction);
					
					e.preventDefault();
				});
				$("#downloadloandocument" + val.id).button({icons: {
	                primary: "ui-icon-arrowthickstop-1-s"}
	            	}).click(function(e) {
					var url = loanUrl + '/documents/'+val.id + '/attachment';
					executeAjaxOctetStreamDownloadRequest(url);
					e.preventDefault();
				});
			});			
			//associate event with add loan document button
			$('#addloandocument'+loanId).button({icons: {
	                primary: "ui-icon-plusthick"}
	            	}).click(function(e) {
				var getUrl = "";
				var putUrl = loanUrl + '/documents';
				var templateSelector = "#loanDocumentsFormTemplate";
				var width = 600; 
				var height = 450;
				
				var saveSuccessFunction = function(data, textStatus, jqXHR) {
				  	$("#dialog-form").dialog("close");
				  	refreshLoanDocuments(loanId);
				}
				
				popupDialogWithFormView(getUrl, putUrl, 'POST', "dialog.title.loan.document.add", templateSelector, width, height,  saveSuccessFunction);
			    e.preventDefault();
			});
		}
  		executeAjaxRequest("loans/"+ loanId + '/documents', 'GET', "", successFunction, formErrorFunction);	 
}

/* crud admin code */

	function refreshTableView(tableName) {

		var successFunction = function(data, textStatus, jqXHR) {

				var crudObject = new Object();
				crudObject.crudRows = data;
				
				if (tableName == "configuration") {
					crudObject.crudRows = data.globalConfiguration;
				}
				
				var html = $("#" + tableName + "ListTemplate").render(crudObject);
				$("#listplaceholder").html(html);  

				if (tableName == "permission") jQuery.MifosXPermissions.addViewPermissionsTabs(data, "#permissionsDiv");

				$("a.enableconfiguration").click( function(e) {
					
					var linkId = this.id;
					var configName = linkId.replace("enableconfiguration-", "");
					var resourceUrl = "configurations?" + configName + "=true";
					
					var width = 400; 
					var height = 150;
					var saveSuccessFunction = function(data, textStatus, jqXHR) {
					  	$("#dialog-form").dialog("close");
					  	refreshTableView(tableName);
					};
					popupConfirmationDialogAndPost(resourceUrl, 'PUT', 'dialog.title.confirmation.required', width, height, configName, saveSuccessFunction);
				
					e.preventDefault();
				});
				
				$("a.disableconfiguration").click( function(e) {
					var linkId = this.id;
					var configName = linkId.replace("disableconfiguration-", "");
					var resourceUrl = "configurations?" + configName + "=false";
					
					var width = 400; 
					var height = 150;
					var saveSuccessFunction = function(data, textStatus, jqXHR) {
					  	$("#dialog-form").dialog("close");
					  	refreshTableView(tableName);
					};
					popupConfirmationDialogAndPost(resourceUrl, 'PUT', 'dialog.title.confirmation.required', width, height, configName, saveSuccessFunction);
				
					e.preventDefault();
				});
				
				$("a.edit" + tableName).click( function(e) {
					var linkId = this.id;
					var entityId = linkId.replace("edit" + tableName, "");

					var resourceUrl = tableName + "s/" + entityId;
					if(tableName == 'employee'){
						resourceUrl = "staff" + "/" + entityId;
					}
					maintainTable(tableName, resourceUrl, 'PUT');
					e.preventDefault();
				});

				$("a.permissions" + tableName).click( function(e) {
					var linkId = this.id;
					var entityId = linkId.replace("permissions" + tableName, "");
					var resourceUrl = tableName + "s/" + entityId + "/permissions";
					maintainTable(tableName, resourceUrl, 'PUT');
					e.preventDefault();
				});


				$("a.delete" + tableName).click( function(e) {
					
					if (tableName === 'savingproduct' ||tableName === 'depositproduct' || tableName ==='charge' || tableName ==='user' || tableName == 'code' || tableName == 'officetransaction'
						|| tableName == 'subscription' || tableName === 'item') {
						var linkId = this.id;
						var entityId = linkId.replace("delete" + tableName, "");

						var resourceUrl = tableName + "s/" + entityId;
						var width = 400; 
						var height = 150;
						var saveSuccessFunction = function(data, textStatus, jqXHR) {
						  	$("#dialog-form").dialog("close");
						  	refreshTableView(tableName);
						};
						popupConfirmationDialogAndPost(resourceUrl, 'DELETE', 'dialog.title.confirmation.required', width, height, entityId, saveSuccessFunction);
					} else {
						showNotAvailableDialog('dialog.title.functionality.not.available');	
					}
					
					e.preventDefault();
				});
				
				$("a.deactivate"  + tableName).click( function(e) {
					showNotAvailableDialog('dialog.title.functionality.not.available');
					e.preventDefault();
				});
				
				$("a.changepassword"  + tableName).click( function(e) {
					var linkId = this.id;
					var entityId = linkId.replace("changepassword" + tableName, "");
					
					if (tableName ==='user') {
						var putUrl = 'users/' + entityId;
						var templateSelector = "#changePasswordFormTemplate";
						var width = 600; 
						var height = 350;
						
						var saveSuccessFunction = function(data, textStatus, jqXHR) {
							$("#dialog-form").dialog("close");
							if (currentUser == entityId) resetBasicAuthKey(false);
						}
						
						popupDialogWithPostOnlyFormView(putUrl, 'PUT', 'dialog.title.update.password', templateSelector, width, height, saveSuccessFunction, 0, 0, 0);
					}
					e.preventDefault();
				});

				$("a.deregister" + tableName).click( function(e) {
					
						var linkId = this.id;
						var entityId = linkId.replace("deregister" + tableName, "");

						var resourceUrl = tableName + "s/deregister/" + entityId;
						var width = 400; 
						var height = 150;
						var saveSuccessFunction = function(data, textStatus, jqXHR) {
						  	$("#dialog-form").dialog("close");
						  	refreshTableView(tableName);
						};
						popupConfirmationDialogAndPost(resourceUrl, 'POST', 'dialog.title.confirmation.required', width, height, entityId, saveSuccessFunction);
					
						e.preventDefault();
				});

				$("a.bulkloanreassignment").click(function(e){

					var officeId = $(this).attr("data-officeid");
					var fromLoanOfficerId = $(this).attr("data-fromloanofficerid");
					var getUrl = "loans/loanreassignment/template?officeId="+officeId+"&fromLoanOfficerId="+fromLoanOfficerId;
					var postUrl = "loans/loanreassignment";

					var saveSuccessFunction = function(data, textStatus, jqXHR) {
					  	$("#dialog-form").dialog("close");
					  	refreshTableView("employee");
					};

					popupDialogWithFormView(getUrl, postUrl, "POST", "bulkLoanReassignment", "#bulkLoanReassignmentFormTemplate", crudData["bulkLoanReassignment"].dialogWidth, crudData["bulkLoanReassignment"].dialogHeight, saveSuccessFunction); 

					e.preventDefault();
				})

				var oTable = displayListTable(tableName + "stable");
				
				
			  };
		
		if(tableName=="employee"){
			executeAjaxRequest('staff', 'GET', "", successFunction, formErrorFunction);
		}else{
  			executeAjaxRequest(tableName + 's', 'GET', "", successFunction, formErrorFunction);
  		}
	}
	

	function maintainTable(tableName, resourceUrl, submitType, putPostQuery) {
		
		if (!(submitType == "PUT" || submitType == "POST"))
		{
			//console.log("System Error - Invalid submitType: " + submitType);
			return;
		}

		var templateSelector = "#" + tableName + "FormTemplate";

		var dialogTitle = "dialog.title." + tableName + ".details";
		if (submitType == "POST") dialogTitle = 'dialog.title.add.' + tableName;

		var dialogWidth = crudData[tableName].dialogWidth;
		var dialogHeight = crudData[tableName].dialogHeight;

		
		var genSSF = 'var saveSuccessFunction = function(data, textStatus, jqXHR) {';
		genSSF += '$("#dialog-form").dialog("close");';
		if (crudData[tableName].refreshListNeeded == true) genSSF += 'refreshTableView("' + tableName + '");';
		genSSF += '}';
		eval(genSSF);
		
//datatable specific code
		if (tableName == "datatable") 
		{
			dialogTitle = 'dialog.title.register.datatable';
			popupRegisterDatatableDialog('dialog.title.register.datatable', templateSelector, dialogWidth, dialogHeight, saveSuccessFunction, 0, 0, 0);
			return false;
		}
//end datatable specific code

		if (resourceUrl.indexOf("/permissions") > -1) 
		{
			templateSelector = "#rolePermissionsFormTemplate";
			dialogTitle = "dialog.title.role.permissions.details";

			dialogWidth = 1200;
			dialogHeight = 500;
		}

		if (resourceUrl.indexOf("makerCheckerable") > -1) 
		{//configure maker-checker on maintenance permissions
				dialogTitle = "dialog.title.maintainMC.details";
		}

		var getUrl = ''; 
		var putPostUrl = resourceUrl;
		if (putPostQuery > "") putPostUrl += "?" + putPostQuery;

		if (submitType == "POST") 
		{
			if (crudData[tableName].editTemplateNeeded == true) //needs to read data to populate dialog form
			{
				if(tableName== "employee"){
					getUrl = "offices" 
				}else{
					getUrl = resourceUrl + '/template';
				}
				popupDialogWithFormView(getUrl, putPostUrl, submitType, dialogTitle, templateSelector, dialogWidth, dialogHeight, saveSuccessFunction);
			}
			else popupDialogWithPostOnlyFormView(putPostUrl, submitType, dialogTitle, templateSelector, dialogWidth, dialogHeight, saveSuccessFunction, 0, 0, 0);
		}
		else
		{
			if (crudData[tableName].editTemplateNeeded == true) getUrl = resourceUrl + '?template=true'
			else getUrl = resourceUrl;
			
			
			popupDialogWithFormView(getUrl, putPostUrl, submitType, dialogTitle, templateSelector, dialogWidth, dialogHeight, saveSuccessFunction);
		}
		
	}


		

/* reports code */

function showILReporting(reportCategory) {
	setReportingContent("content");

//var reportingParams = {
 reportingParams = {
	RESTUrl: baseApiUrl + "reports",
	basicAuthKey: base64,
	tenantIdentifier: tenantIdentifier,
	initialLanguage: currentCulture,
	bundleDir: "resources/stretchyreporting/mifosngbundle/",
	reportsListDiv: "myListOfReports",
	reportOutputOptionsDiv: "reportOutputOptionsDiv",
	runReportDiv: "myRunReportButton",
	clearReportDiv: "myClearReportButton",
	inputParametersDiv: "myInputParameters",
	reportOutputDiv: "myOutput",
	indianFormat: false,
	highlightMissingXlations: "N",
	loadingImg: "resources/stretchyreporting/dots64.gif",
	resValue: "resources/libs/"
};

	if (reportCategory)
	{
		reportingParams.reportQuery = 'reportCategoryList';
		reportingParams.reportQueryParams = {
									"reportCategory": reportCategory
								};
	}

	jQuery.stretchyReporting.initialise(reportingParams);

	$("#toptable").slideToggle("slow");

}

function selectNewDecimals(selectedVal) {
	if (!(selectedVal == "")) jQuery.stretchyReporting.changeDecimals(selectedVal);
}

function selectNewThousandsSep(selectedVal) {

	if (!(selectedVal == "")) 
	{

		switch(selectedVal )
		{
			case "INDIAN":
				jQuery.stretchyReporting.changeSeparator(",", ".", true);
  				break;
			case "NONE":
				jQuery.stretchyReporting.changeSeparator("", ".", false);
  				break;
			default:
				jQuery.stretchyReporting.changeSeparator(selectedVal.substr(0,1), selectedVal.substr(1,1), false);
		}
	}
}


//account settings
function showAccountSettings() {

	setAccountSettingsContent("content"); 
	$tabs = $("#tabs").tabs({
		"add": function( event, ui ) {
			$tabs.tabs('select', '#' + ui.panel.id);
		}

	});

	var errorFunction = function(jqXHR, status, errorThrown, index, anchor) {
	            $(anchor.hash).html("error occured while ajax loading.");
	        };

	var successFunction = function(data, status, xhr) {
				var tableHtml = $("#userSettingsTemplate").render(data);
				$("#settings").html(tableHtml);
				
				$('#changepassword').click(function(e) {
					var putUrl = 'users/' + currentUser;
					var templateSelector = "#changePasswordFormTemplate";
					var width = 600; 
					var height = 350;
					
					var saveSuccessFunction = function(data, textStatus, jqXHR) {
						$("#dialog-form").dialog("close");
						resetBasicAuthKey(true);
					}
					
					popupDialogWithPostOnlyFormView(putUrl, 'PUT', 'dialog.title.update.password', templateSelector, width, height, saveSuccessFunction, 0, 0, 0);
				    e.preventDefault();
				});
				
				$('#changedetails').click(function(e) {
					var getAndPutUrl = 'users/' + currentUser;
					var templateSelector = "#userSettingsFormTemplate";
					var width = 600; 
					var height = 350;
					
					var saveSuccessFunction = function(data, textStatus, jqXHR) {
						$("#dialog-form").dialog("close");
						resetBasicAuthKey(true);
					}
					
					popupDialogWithFormView(getAndPutUrl, getAndPutUrl, 'PUT', 'dialog.title.update.details', templateSelector, width, height, saveSuccessFunction);
					
				    e.preventDefault();
				});
	        };
    
	executeAjaxRequest("users/" + currentUser, 'GET', "", successFunction, errorFunction);	  
}
	


//authenticate user and set global details
function setBasicAuthKey(logonDivName, username, password) 
{ 

	base64 = "";
	currentUser = -1;
	currentUserName = "";
	currentPwd = "";
	newPassword = "";
	newUserName = "";


	var url = "authentication?username=" + username + "&password=" + password;
	var successFunction = function(data, textStatus, jqXHR) { 
					base64 = data.base64EncodedAuthenticationKey; 
					currentUser = data.userId;
					currentUserName = data.username;
					currentPwd = password;

					jQuery.MifosXUI.initialise(data.permissions, applicationProfile, tenantIdentifier, applicationMode);

					showMainContainer(logonDivName, username);
					custom.showFirstPage();
					return false;
			};

	var errorFunction = function(jqXHR, textStatus, errorThrown) {
	        			handleXhrError(jqXHR, textStatus, errorThrown, "#formErrorsTemplate", "#formerrors");
					return true;
				};

	executeAjaxRequest(url, 'POST', "", successFunction, errorFunction);
}

function resetBasicAuthKey(refreshAccountSettings) 
{ 

	base64 = "";
	var usePassword = currentPwd;
	if (newPassword > "") usePassword = newPassword;
	var useUserName = currentUserName;
	if (newUserName > "") useUserName = newUserName;

	var url = "authentication?username=" + useUserName + "&password=" + usePassword;
	var successFunction = function(data, textStatus, jqXHR) { 
					base64 = data.base64EncodedAuthenticationKey; 
					currentUser = data.userId;
					currentUserName = data.username;
					currentPwd = usePassword;
					$("#displayUN").html(currentUserName);
					if (refreshAccountSettings == true) showAccountSettings();
					newPassword = "";
					newUserName = "";
					return false;
			};

	var errorFunction = function(jqXHR, textStatus, errorThrown) {
	        			handleXhrError(jqXHR, textStatus, errorThrown, "#formErrorsTemplate", "#formerrors");
					return true;
				};

	executeAjaxRequest(url, 'POST', "", successFunction, errorFunction);

}


//Popups used for saving data and confirmation
function popupDialogWithReadOnlyFormView(getUrl, titleCode, templateSelector, width, height) {

	var executeGetUrlSuccessFunction = function(data, textStatus, jqXHR) {
		popupDialogWithReadOnlyFormViewData(data, titleCode, templateSelector, width, height);
  	};
  	
	if (getUrl.indexOf("/permissions") > -1) 
	{
		executeGetUrlSuccessFunction = function(data, textStatus, jqXHR) {
			popupDialogWithReadOnlyFormViewData(data, titleCode, templateSelector, width, height);
			
			// TODO - KW - need to support ability to display 'proposed changes'
			jQuery.MifosXPermissions.addRolePermissionsTabs(data, "#rolePermissionsDiv");
	  	};
	}
	
	if (getUrl == "") {
		popupDialogWithReadOnlyFormViewData("", titleCode, templateSelector, width, height);
	}
	else {
		executeAjaxRequest(getUrl, "GET", "", executeGetUrlSuccessFunction, formErrorFunction);
	}
}

function popupDialogWithReadOnlyFormViewData(data, titleCode, templateSelector, width, height)  {
	
	var dialogDiv = $("<div id='dialog-form'></div>");
	var cancelButton = doI18N('dialog.button.cancel');

	var buttonsOpts = {};
	buttonsOpts[cancelButton] = function() {$(this).dialog( "close" );};
	
	dialogDiv.dialog({
	  		title: doI18N(titleCode), 
	  		width: width, 
	  		height: height, 
	  		modal: true,
	  		buttons: buttonsOpts,
	  		close: function() {
	  			// if i dont do this, theres a problem with errors being appended to dialog view second time round
	  			$(this).remove();
			},
	  		open: function (event, ui) {
	  			var dialogDiv = $("#dialog-form");
	  			var formHtml = $(templateSelector).render(data);
	  			dialogDiv.html(formHtml);
	  		}
	  	}).dialog('open');
}

// end of readonly form view

function popupDialogWithFormView(getUrl, postUrl, submitType, titleCode, templateSelector, width, height, saveSuccessFunction) {

		var successFunction = function(data, textStatus, jqXHR) {
		

				if(templateSelector == "#employeeFormTemplate" && submitType!= "PUT"){
					var officesObject = new Object();
			    	officesObject.crudRows = data;
					popupDialogWithFormViewData(officesObject, postUrl, submitType, titleCode, templateSelector, width, height, saveSuccessFunction);
					//console.log("#employeeFormTemplate");
				}else if(templateSelector == "#employeeFormTemplate" && submitType == "PUT") {
					templateSelector = "#employeeFormEditTemplate";
					popupDialogWithFormViewData(data, postUrl, submitType, titleCode, templateSelector, width, height, saveSuccessFunction);
					//console.log("#employeeFormTemplate");
				}
				else{
					popupDialogWithFormViewData(data, postUrl, submitType, titleCode, templateSelector, width, height, saveSuccessFunction);
					//console.log("else");
		  		}
		  		
		  		//loanproduct specific code 
				if (templateSelector == "#loanproductFormTemplate") 
				{
					//(initialize comboboxes)
					$("#fundSourceAccountId").combobox();
					$("#loanPortfolioAccountId").combobox();
					$("#interestOnLoanAccountId").combobox();
					$("#incomeFromFeeAccountId").combobox();
					$("#incomeFromPenaltyAccountId").combobox();
					$("#writeOffAccountId").combobox();
					$("#receivableInterestAccountId").combobox();
					$("#receivableFeeAccountId").combobox();
					$("#receivablePenaltyAccountId").combobox();
					
					var showCashFinancialPlaceholders = function() {
						 $("#accountingPlaceholdersDiv").show();
			        	 //hide receivables
			        	 $("#interestReceivableRow").hide();
			        	 $("#feeReceivableRow").hide();
			        	 $("#penaltyReceivableRow").hide();
					};
					
					var showAccrualFinancialPlaceholders = function() {
						 $("#accountingPlaceholdersDiv").show();
			        	 //show receivables
			        	 $("#interestReceivableRow").show();
			        	 $("#feeReceivableRow").show();
			        	 $("#penaltyReceivableRow").show();
					}
					
					//onchange events for radio buttonaccountingType
					 $("input[name=accountingType]").change(function() {
				        var selectedValue = $(this).val();
				        if(selectedValue == "1"){
				        	 $("#accountingPlaceholdersDiv").hide();
				        }else if (selectedValue == "2"){
				        	 showCashFinancialPlaceholders();
				        }else if (selectedValue == "3"){
				        	 showAccrualFinancialPlaceholders();
				        }
				    }); 
				    
				    //hide accounting placeholders div on page load
				    if(data.accountingType == 1){
				    	$("#accountingPlaceholdersDiv").hide();
				    }else if (data.accountingType == 2){
				    	 showCashFinancialPlaceholders();
				    }else if (data.accountingType == 3){
				    	 showAccrualFinancialPlaceholders();
				    }
				}
				//end loan product specific code
		  	};
		 

		if (getUrl == "") popupDialogWithFormViewData("", postUrl, submitType, titleCode, templateSelector, width, height, saveSuccessFunction)
		else executeAjaxRequest(getUrl, "GET", "", successFunction, formErrorFunction);
}

function popupDialogWithFormViewData(data, postUrl, submitType, titleCode, templateSelector, width, height, saveSuccessFunction)  {

	var dialogDiv = $("<div id='dialog-form'></div>");
	
	
		var saveButton = doI18N('dialog.button.save');
		var cancelButton = doI18N('dialog.button.cancel');
		
		//console.log("inside popupDialogWithFormViewData ");
	var serializationOptions = {};
	serializationOptions["checkboxesAsBools"] = true;
	
	var buttonsOpts = {};
	buttonsOpts[saveButton] = function() {
		  var obj = $('#save');
		   obj.attr('disabled', true);
		//console.log("1");
		$('#notSelectedClients option').each(function(i) {
			$(this).attr("selected", "selected");
		});
		//console.log("2");
		$('#clientMembers option').each(function(i) {
			$(this).attr("selected", "selected");
		});
		//console.log("3");
		$('#notSelectedCharges option').each(function(i) {
			$(this).attr("selected", "selected");
		});
		//console.log("4");
		$('#charges option').each(function(i) {
			$(this).attr("selected", "selected");
		});
		//console.log("5");
		$('#notSelectedRoles option').each(function(i) {  
			$(this).attr("selected", "selected");  
		});
		//console.log("6");
		$('#roles option').each(function(i) {  
		   	$(this).attr("selected", "selected");  
		});
		//console.log("7");
		 $('#notSelectedservices option').each(function(i) {  
							$(this).attr("selected", "selected");  
						});
		//console.log("8");
		$('#services option').each(function(i) {  
		   	$(this).attr("selected", "selected");  
		});
		//console.log("9");
		$('#notSelectedItems option').each(function(i) {  
			   $(this).attr("selected", "selected");  
		});
		//console.log("10");
		$('#selectedItems option').each(function(i) {  
			$(this).attr("selected", "selected");  
		});
		//console.log("11");
		$('#notSelectedCurrencies option').each(function(i) {  
		    	   	$(this).attr("selected", "selected");  
		});
		//console.log("12");
		$('#currencies option').each(function(i) {  
		   		$(this).attr("selected", "selected");  
		});
		//console.log("13");
		//console.log("till....");
		if (document.changeUserSettingsForm!=undefined) {
			newUserName = document.changeUserSettingsForm.username.value;
			//console.log("14 inside if");
		}
		
		var serializedArray = {};
			
		if (templateSelector === "#bulkLoanReassignmentFormTemplate"){
			serializationOptions["checkboxesAsBools"] = false; // send checkboxes values (which contain loans ids) instead of bools
			//console.log("if1");
		} 
		serializedArray = $('#entityform').serializeObject(serializationOptions);	
		
		if (!serializedArray["charges"] && postUrl.substring(0, 13) == "loanproducts/") {
			serializedArray["charges"] = new Array();
			//console.log("if2");
		}
			
		//manipulate serialized array for guarantors
    	if (postUrl.toLowerCase().indexOf("guarantor") >= 0){
    	   //TODO: Vishwas...var is repeated
		   //console.log("if3");
    	   var serializedArray = {};
    	   var isChecked = $('#internalGuarantorCheckbox').is(':checked')
    	   serializedArray["loanId"] = $('#guaranteedLoanId').val();
		   if(isChecked){
		   //console.log("if4");
    	   	serializedArray["entityId"] = $('#selectedGuarantorIdentifier').val();
    	   	serializedArray["guarantorTypeId"] = 1;
    	   }else{
		   //console.log("else5");
    	   	serializedArray["guarantorTypeId"] = 3;
    	   	serializedArray["firstname"] = $('#guarantorFirstName').val();
    	   	serializedArray["lastname"] = $('#guarantorLastName').val();
    	   	serializedArray["dob"] = $('#guarantorDateOfBirth').val();
    	   	serializedArray["addressLine1"] = $('#guarantorAddressLine1').val();
    	   	serializedArray["addressLine2"] = $('#guarantorAddressLine2').val();
    	   	serializedArray["city"] = $('#guarantorCity').val();
    	   	serializedArray["zip"] = $('#guarantorZip').val();
    	   	serializedArray["mobileNumber"] = $('#guarantorMobileNumber').val();
    	   	serializedArray["housePhoneNumber"] = $('#guarantorHouseNumber').val();
    	   	serializedArray["locale"] = $('#locale').val();
    	   	serializedArray["dateFormat"] = $('#dateFormat').val();
    	   }  
		   }
		   if (templateSelector === "#orderFormTemplate"){
		   //console.log("if6");
			    		serializedArray = $('#entityform').serializeObject(serializationOptions);
			    		serializedArray["paytermCode"] = $('#paytermCode').val();
					}
    	
    	
    	//manipulate serialized array for journal entries
    	if (postUrl.toLowerCase().indexOf("journalentries") >= 0){
    		serializedArray = {};
			serializedArray["locale"] = $('#locale').val();
    	   	serializedArray["dateFormat"] = $('#dateFormat').val();
    	   	serializedArray["officeId"] = $('#officeId').val();
    	   	serializedArray["entryDate"] = $('#entryDate').val();
    	   	serializedArray["comments"] = $('#comments').val();	
    	   	//populate debits and credits array
			//console.log("if7");
    	   	var populateCreditOrDebitArray = function(type){
    	   		serializedArray[type] = new Array();
    	   		$("#" + type).children('p').each(function (i) {
    	   		// "this" is the current element in the loop
    	   		var tempObject= new Object();
			    $(this).children('label').each(function(j){
			    	if(j==0){
			    		//for property of label had Id of glAccount selectbox
			    		tempObject.glAccountId=$("#"+$(this).attr("for")).val();
						//console.log("if8");
			    	}else{
					//console.log("if9");
			    		//for property of label had Id of amount input
			    		tempObject.amount=$("#"+$(this).attr("for")).val();;
			    	}
			    }); 
			    serializedArray[type][i]=tempObject;
				});
    	   	}
    	   	populateCreditOrDebitArray("debits");
			populateCreditOrDebitArray("credits");
		}
		
    	if(templateSelector == '#inventoryItemFormTemplate'){
    		serializedArray["itemMasterId"] = $('#itemMasterId').val();
    		serializedArray["serialNumber"] = $('#serialNumber').val();
    		serializedArray["grnId"] = $('#grnId').val();
    		serializedArray["provisioningSerialNumber"] = $('#provisioningSerialNumber').val();
    		serializedArray["quality"] = $('#quality').val();
    		serializedArray["status"] = $('#status').val();
    		serializedArray["warranty"] = $('#warranty').val();
    		serializedArray["remarks"] = $('#remarks').val();
    		serializedArray["locale"] = $('#locale').val();
    		//serializedArray["lastMofdifiedById"] = $('#lastModifiedById').val();
    		if($('#provisioningSerialNumber').val()=="" | $('#provisioningSerialNumber').val()==" ")
    			serializedArray["provisioningSerialNumber"] = $('#serialNumber').val();
    		//console.log($('#provisioningSerialNumber').val());
    	}
    	
		var newFormData = JSON.stringify(serializedArray);
		//console.log(newFormData);
		if (postUrl.toLowerCase().indexOf("permissions") > -1) {
			var permissions = {};
			permissions.permissions = serializedArray;
			newFormData = JSON.stringify(permissions);
			//console.log("if10");
		}
	
		//spl ajax req for webcam and doc upload
		if( templateSelector == '#clientImageWebcamFormTemplate'){
			var imageCanvas = $('#imageCanvas')[0];
			var imageForUpload = imageCanvas.toDataURL("image/jpeg");
			//console.log("if11");
			executeAjaxRequest(postUrl, submitType, imageForUpload, saveSuccessFunction, formErrorFunction);
		}
		
		
		else if (postUrl.toLowerCase().indexOf("documents") >= 0 || postUrl.toLowerCase().indexOf("image") >= 0 ){
			var formData = new FormData();    
			formData.append( 'file', $('#file')[0].files[0] );
			$.each(serializedArray, function (name, val) {
		        formData.append(name, val);
		    });	
			//console.log("if12");
			executeMultipartUploadAjaxRequest(postUrl, submitType, formData, saveSuccessFunction, formErrorFunction);
			//console.log("if13");
		}else{
		//console.log("if14");
			//console.log("ajax");
			//console.log(postUrl);
			executeAjaxRequest(postUrl, submitType, newFormData, saveSuccessFunction, formErrorFunction);
		}
		//console.log("done");
	};
	// end of buttonsOpts for save button
	
	
	
	if( templateSelector == '#invoceDetailsFormTemplate' ||templateSelector == '#tickethistoryFormTemplate' ||templateSelector == '#orderPriceFormListTemplate'
		 ||templateSelector == '#orderDetailsFormListTemplate'){
	
		var closebutton = {};
		closebutton['Close'] = function() {$(this).dialog( "close" );};
		dialogDiv.dialog({
	  		title: doI18N(titleCode), 
	  		width: width, 
	  		height: height, 
	  		modal: true,
	  		buttons: closebutton,
	  				  		close: function() {
	  			// if i dont do this, theres a problem with errors being appended to dialog view second time round
	  			$(this).remove();
			},
	  		open: function (event, ui) {
	  			repopulateOpenPopupDialogWithFormViewData(data, postUrl, submitType, titleCode, templateSelector, width, height, saveSuccessFunction);
	  			var oTable = displayListTable("orderstable");
	  			var oTable = displayListTable("orderpricetable");
	  		
	  		}
	  	}).dialog('open');
		
	}else{
	buttonsOpts[cancelButton] = function() {$(this).dialog( "close" );};
	
	buttonsOpts[saveButton]= 	
		
	dialogDiv.dialog({
	  		title: doI18N(titleCode), 
	  		width: width, 
	  		height: height, 
	  		modal: true,
	  		buttons: buttonsOpts,
	  		
	  		close: function() {
	  			// if i dont do this, theres a problem with errors being appended to dialog view second time round
	  			$(this).remove();
			},
	  		open: function (event, ui) {
	  			var obj = $(this);
	  			toggleBtn(obj);
	  			repopulateOpenPopupDialogWithFormViewData(data, postUrl, submitType, titleCode, templateSelector, width, height, saveSuccessFunction);
	  		}
			
	  	}).dialog('open');
}
}

function toggleBtn(obj) {
    if (obj.attr('disabled') == true) {
        obj.attr('disabled', false);
    }  
    else {
        obj.attr('disabled', true);    
    }
}
function repopulateOpenPopupDialogWithFormViewData(data, postUrl, submitType, titleCode, templateSelector, width, height, saveSuccessFunction){
	var dialogDiv = $("#dialog-form");
	var formHtml = "";
	switch(templateSelector)
	{
			case "#rolePermissionsFormTemplate":
				formHtml = $(templateSelector).render(data);
				dialogDiv.html(formHtml);
				jQuery.MifosXPermissions.addRolePermissionsTabs(data, "#rolePermissionsDiv");
  				break;
			case "#permissionFormTemplate":
				formHtml = $(templateSelector).render({dummy: true});
				dialogDiv.html(formHtml);
				jQuery.MifosXPermissions.maintainMakerCheckerTabs(data, "#makerCheckerPermissionsDiv");
  				break;
			default:
				formHtml = $(templateSelector).render(data);
				dialogDiv.html(formHtml);
	}

	//attaching charges to loan from popup
	$('#chargeOptions').change(function(e) {
		if ($(this).val() > 0){
			var selectChargeForLoanSuccess = function(chargeData, textStatus, jqXHR){
				var partialFormHtml = $("#loanChargeDetailsPartialFormTemplate").render(chargeData);
				$("#loanChargeDetails").html(partialFormHtml);
				$('.datepickerfieldnoconstraint').datepicker({constrainInput: true, defaultDate: 0, dateFormat: custom.datePickerDateFormat});
			}
			executeAjaxRequest("charges/" + $(this).val() + "?template=true", "GET", "", selectChargeForLoanSuccess, formErrorFunction);    	
		}
	})

	if (templateSelector === "#groupFormTemplate"){
		$("#dialog-form #officeId").change(function(e){
			var selectedOfficeId = $(this).val();
			var officeIdChangeSuccess = function(groupData, textStatus, jqXHR){
				groupData['officeId'] = selectedOfficeId;
				repopulateOpenPopupDialogWithFormViewData(groupData, postUrl, submitType, titleCode, templateSelector, width, height, saveSuccessFunction)
			}
			if (data['id']){
				executeAjaxRequest("groups/" + data['id'] + "?template=true&officeId=" + selectedOfficeId, "GET", "", officeIdChangeSuccess, formErrorFunction);	
			} else {
				executeAjaxRequest("groups/template?officeId=" + selectedOfficeId, "GET", "", officeIdChangeSuccess, formErrorFunction);	
			}
		})
	}

	if (templateSelector === "#bulkLoanReassignmentFormTemplate"){
		$("#dialog-form #officeId").change(function(e){
			var selectedOfficeId = $("#dialog-form #officeId").val();
			withOfficeIdUrl = postUrl + "/template?officeId=" + selectedOfficeId;
			var officeIdSelectSuccess = function(loanReassignmentData, textStatus, jqXHR){
				repopulateOpenPopupDialogWithFormViewData(loanReassignmentData, postUrl, submitType, titleCode, templateSelector, width, height, saveSuccessFunction)
			}
			executeAjaxRequest(withOfficeIdUrl, "GET", "", officeIdSelectSuccess, formErrorFunction);
		});
		
		
		
		$("#dialog-form #fromLoanOfficerId").change(function(e){
			var selectedOfficeId = $("#dialog-form #officeId").val();
			var selectedFromLoanOfficerId = $("#dialog-form #fromLoanOfficerId").val();
			var withOfficeIdAndFromLoanOfficerIdUrl = postUrl  + "/template?officeId=" + selectedOfficeId + "&fromLoanOfficerId="+selectedFromLoanOfficerId+"";
			var fromLoanOfficerIdSelectSuccess = function(loanReassignmentData, textStatus, jqXHR){
				repopulateOpenPopupDialogWithFormViewData(loanReassignmentData, postUrl, submitType, titleCode, templateSelector, width, height, saveSuccessFunction)
			}
			executeAjaxRequest(withOfficeIdAndFromLoanOfficerIdUrl, "GET", "", fromLoanOfficerIdSelectSuccess, formErrorFunction); 
		});
		$("input[type='checkbox']").click(function(){ // checkboxes hierarchy handler
			if ($(this).is("[data-id]")){
				var isChecked = $(this).is(":checked");
				$("input[data-parentid='"+$(this).attr("data-id")+"']").prop("checked", isChecked);
			} else {
				if( $("input[data-parentid='"+$(this).attr("data-parentid")+"']").filter(':not(:checked)').length === 0){
					$("input[data-id='"+$(this).attr("data-parentid")+"']").prop("checked", true);
				} else {
					$("input[data-id='"+$(this).attr("data-parentid")+"']").prop("checked", false);
				}			
			}
		})
	}
	
	
	
	if (templateSelector === "#addressFormTemplate"){
	
	
		$(function() {	
			var data1=data;
		  data1 = $.map(data1.countryData, function (el) {
		    	  return { 
		    	        label: el,
		    	        value: el
		    	        };
			    });

		 $("#country").autocomplete({ 
			    	source: data1
		}).css('height','12px','width','50px');
		
		});
		$(function() {	
			var data2=data;
		    data2 = $.map(data2.stateData, function (el) {
		    	  return { 
		    	        label: el,
		    	        value: el
		    	    };
			    });

			    $("#state").autocomplete({ 
			        source: data2
			    }).css('height','12px','width','50px');;
		
		});
		
		$(function() {	
			var data3=data;
		    data3 = $.map(data3.cityData, function (el) {
		    	  return { 
		    	        label: el,
		    	        value: el
		    	    };
			    });

			    $("#city").autocomplete({ 
			        source: data3
			    }).css('height','12px','width','50px');;
		
		});
		
		/*$("#dialog-form #country").change(function(e){
			var country = $("#dialog-form #country").val();
			getUri='address/'+country;
			var officeIdSelectSuccess = function(loanReassignmentData, textStatus, jqXHR){
				repopulateOpenPopupDialogWithFormViewData(loanReassignmentData, postUrl, submitType, titleCode, templateSelector, width, height, saveSuccessFunction)
			}
			executeAjaxRequest(getUri, "GET", "", officeIdSelectSuccess, formErrorFunction);
		});
		
		
		
		$("#dialog-form #state").change(function(e){
			var state = $("#dialog-form #state").val();
			var selectedFromLoanOfficerId = $("#dialog-form #state").val();
			getUri='address/'+state;
			var fromLoanOfficerIdSelectSuccess = function(loanReassignmentData, textStatus, jqXHR){
				repopulateOpenPopupDialogWithFormViewData(loanReassignmentData, postUrl, submitType, titleCode, templateSelector, width, height, saveSuccessFunction)
			}
			executeAjaxRequest(getUri, "GET", "", fromLoanOfficerIdSelectSuccess, formErrorFunction); 
		});*/
		$("input[type='checkbox']").click(function(){ // checkboxes hierarchy handler
			if ($(this).is("[data-id]")){
				var isChecked = $(this).is(":checked");
				$("input[data-parentid='"+$(this).attr("data-id")+"']").prop("checked", isChecked);
			} else {
				if( $("input[data-parentid='"+$(this).attr("data-parentid")+"']").filter(':not(:checked)').length === 0){
					$("input[data-id='"+$(this).attr("data-parentid")+"']").prop("checked", true);
				} else {
					$("input[data-id='"+$(this).attr("data-parentid")+"']").prop("checked", false);
				}			
			}
		})
	}
	
	if (templateSelector === "#oneTimeSaleFormTemplate"){
		//console.log("inside templateselector if statement");
		$("#dialog-form #itemId").change(function(e){
		var itemId = $("#dialog-form #itemId").val();
		getUri='onetimesales/'+itemId+'/item';
		var officeIdSelectSuccess = function(loanReassignmentData, textStatus, jqXHR){
			repopulateOpenPopupDialogWithFormViewData(loanReassignmentData, postUrl, submitType, titleCode, templateSelector, width, height, saveSuccessFunction)
			
		}
		executeAjaxRequest(getUri, "GET", "", officeIdSelectSuccess, formErrorFunction);
	});
		
		$("#dialog-form #quantity").change(function(e){
			var itemId = $("#dialog-form #itemId").val();
			var saleDate = $("#dialog-form #saleDate").val();
			var quantity = $("#dialog-form #quantity").val();
			var itemprice = $("#dialog-form #unitPrice").val();
			serializedArray = {};
			serializedArray["quantity"] = $('#quantity').val();
    	   	serializedArray["unitPrice"] = $('#unitPrice').val();
    	   	serializedArray["saleDate"] = $('#saleDate').val();
    	   	var newFormData = JSON.stringify(serializedArray);
			getUri='onetimesales/'+itemId+'/totalprice?quantity='+quantity;
			var officeIdSelectSuccess = function(loanReassignmentData, textStatus, jqXHR){
				repopulateOpenPopupDialogWithFormViewData(loanReassignmentData, postUrl, submitType, titleCode, templateSelector, width, height, saveSuccessFunction)
				
			}
		executeAjaxRequest(getUri, "GET", "", officeIdSelectSuccess, formErrorFunction);
			//executeAjaxRequest(getUri, "POST", newFormData, officeIdSelectSuccess, formErrorFunction);
		});
		
	}
	
	if (templateSelector === "#inventoryItemFormTemplate"){
		//console.log("inside inventoryItemFormTemplate if statement");
		
		$("#dialog-form #id").blur(function(e){
		var id = $("#dialog-form #id").val();
		getUri='itemdetails/template?grnId='+id;
		var officeIdSelectSuccess = function(loanReassignmentData, textStatus, jqXHR){
			repopulateOpenPopupDialogWithFormViewData(loanReassignmentData, postUrl, submitType, titleCode, templateSelector, width, height, saveSuccessFunction)
		}
		executeAjaxRequest(getUri, "GET", "", officeIdSelectSuccess, formErrorFunction);
	});
		
		
		
		/*$("#dialog-form #serialNumber").blur(function(e){
			var serialNumber = $("#dialog-form #serialNumber").val();
			var reg = new RegExp("^[a-zA-Z]+$");//^[0-9]$//^[-]?[0-9]+[\.]?[0-9]+$//[0-9 -()+]+$
			if(!reg.test(serialNumber)){
				$("#dialog-form #formerrors").text("Unexpected value in SerialNumber field, must be Integer");
				$("#dialog-form #serialNumber").css('color','red');
			}else{
				$("#dialog-form #formerrors").text("");
				$("#dialog-form #serialNumber").css('color','black');
			}
		});*/
		
		
		
		$("#dialog-form #remarks").blur(function(e){
			var remarks = $("#dialog-form #remarks").val();
			var reg = new RegExp("^[a-zA-Z]+$");//^[0-9]$//^[a-zA-Z]+$
			if(!reg.test(remarks)){
				$("#dialog-form #formerrors").text("Unexpected value in Remarks field, must be String");
				$("#dialog-form #remarks").css('color','red');
			}else{
				$("#dialog-form #formerrors").text("");
				$("#dialog-form #remarks").css('color','black');
			}
		});
		
		
		$("#dialog-form #warranty").blur(function(e){
			var warranty = $("#dialog-form #warranty").val();
			var button = $(".ui-dialog-b uttonpane button:contains('Save')");
			//alert(button);
			var reg = new RegExp("^[0-9]+$");//^[0-9]$//^[-]?[0-9]+[\.]?[0-9]+$
			if(!reg.test(warranty)){
				$("#dialog-form #formerrors").text("Unexpected value in Warranty field, must be Integer");
				$("#dialog-form #warranty").css('color','red');
				//alert("if");
				$(button).button("disable");
				//alert("after if");
			}else{
				$("#dialog-form #formerrors").text("");
				$("#dialog-form #warranty").css('color','black');
				//alert("else");
				$(button).button("disable");
			}
		});
		
		
		/*
		 * 
		 *   var button = $(".ui-dialog-b	uttonpane button:contains('Save')");
					  //console.log("executeAjaxRequest");
					 $(button).button("disable");
                    */
		
		//"[a-zA-Z]"
		
		/*$("#dialog-form #officeId").blur(function(e){
			var officeId = $("#dialog-form #officeId").val();
			var reg = new RegExp("^[-]?[0-9]+[\.]?[0-9]+$");//^[0-9]$
			if(!reg.test(officeId)){
				$("#dialog-form #officeId").val("Unexpected Value");
			}
		});
		$("#dialog-form #clientId").blur(function(e){
			var clientId = $("#dialog-form #clientId").val();
			var reg = new RegExp("^[-]?[0-9]+[\.]?[0-9]+$");//^[0-9]$
			if(!reg.test(clientId)){
				$("#dialog-form #clientId").val("Unexpected Value");
			}
		});*/
		
		
	}
	
	
	
	
	

	$('#addclientmembers').click(function() {  
		return !$('#notSelectedClients option:selected').remove().appendTo('#clientMembers');  
	});
	$('#removeclientmembers').click(function() {  
		return !$('#clientMembers option:selected').remove().appendTo('#notSelectedClients');  
	});

	$('#addcharges').click(function() {  
		return !$('#notSelectedCharges option:selected').remove().appendTo('#charges');  
	});
	$('#removecharges').click(function() {  
		return !$('#charges option:selected').remove().appendTo('#notSelectedCharges');  
	});

	$('#addroles').click(function() {  
		return !$('#notSelectedRoles option:selected').remove().appendTo('#roles');  
	});	
	$('#removeroles').click(function() {  
		return !$('#roles option:selected').remove().appendTo('#notSelectedRoles');  
	}); 

	$('#add').click(function() {  
	     return !$('#notSelectedItems option:selected').remove().appendTo('#selectedItems');  
	});
	$('#remove').click(function() {  
		return !$('#selectedItems option:selected').remove().appendTo('#notSelectedItems');  
	});
	
	$('#addservices').click(function() {  
		return !$('#notSelectedServices option:selected').remove().appendTo('#services');  
	});	
	$('#removeservices').click(function() {  
		return !$('#services option:selected').remove().appendTo('#notSelectedServices');  
	});

	$('#addcurrencies').click(function() {  
		return !$('#notSelectedCurrencies option:selected').remove().appendTo('#currencies');  
	});
	$('#removecurrencies').click(function() {  
		return !$('#currencies option:selected').remove().appendTo('#notSelectedCurrencies');  
	});

	$('.datepickerfield').datepicker({constrainInput: true, maxDate: 0, dateFormat: custom.datePickerDateFormat});
	$('.datepickerfieldnoconstraint').datepicker({constrainInput: true, defaultDate: 0, dateFormat: custom.datePickerDateFormat});
	
	$("#entityform textarea").first().focus();
	$('#entityform input').first().focus();	
}

function popupRegisterDatatableDialog(titleCode, templateSelector, width, height, saveSuccessFunction) {

var dialogDiv = $("<div id='dialog-form'></div>");
var data = new Object();
var formHtml = $(templateSelector).render(data);
dialogDiv.append(formHtml);

var saveButton = doI18N('dialog.button.save');
var cancelButton = doI18N('dialog.button.cancel');
var buttonsOpts = {};		

buttonsOpts[saveButton] = function() {
	var registerUrl = "datatables/register/" + document.registerDatatableForm.registeredTableName.value + "/" + document.registerDatatableForm.applicationTableName.value;
	// //console.log(registerUrl )
	executeAjaxRequest(registerUrl, "POST", {}, saveSuccessFunction, formErrorFunction);
};
buttonsOpts[cancelButton] = function() {$(this).dialog( "close" );};

dialogDiv.dialog({
  		title: doI18N(titleCode), 
  		width: width, 
  		height: height, 
  		modal: true,
  		buttons: buttonsOpts,
  		close: function() {
  			// if i dont do this, theres a problem with errors being appended to dialog view second time round
  			$(this).remove();
		},
  		open: function (event, ui) {  			
  			$("#entityform textarea").first().focus();
  			$('#entityform input').first().focus();
  		}
  }).dialog('open');
}


// used by deposit account functionality
function popupDialogWithPostOnlyFormView(postUrl, submitType, titleCode, templateSelector, width, height, saveSuccessFunction) {
var dialogDiv = $("<div id='dialog-form'></div>");
var data = new Object();
var formHtml = $(templateSelector).render(data);
dialogDiv.append(formHtml);

var saveButton = doI18N('dialog.button.save');
var cancelButton = doI18N('dialog.button.cancel');
var buttonsOpts = {};		
buttonsOpts[saveButton] = function() {
	$('.multiSelectedItems option').each(function(i) {  
    	   		$(this).attr("selected", "selected");  
    		});

	if (document.changePasswordForm!=undefined) newPassword = document.changePasswordForm.password.value;

	var newFormData = JSON.stringify($('#entityform').serializeObject());

	executeAjaxRequest(postUrl, submitType, newFormData, saveSuccessFunction, formErrorFunction);
};
buttonsOpts[cancelButton] = function() {$(this).dialog( "close" );};

dialogDiv.dialog({
  		title: doI18N(titleCode), 
  		width: width, 
  		height: height, 
  		modal: true,
  		buttons: buttonsOpts,
  		close: function() {
  			// if i dont do this, theres a problem with errors being appended to dialog view second time round
  			$(this).remove();
		},
  		open: function (event, ui) {
  			$('.multiadd').click(function() {  
  			     return !$('.multiNotSelectedItems option:selected').remove().appendTo('#selectedItems');  
  			});
  			
  			$('.multiremove').click(function() {  
  				return !$('.multiSelectedItems option:selected').remove().appendTo('#notSelectedItems');  
  			});
  			
  			$('.datepickerfield').datepicker({constrainInput: true, dateFormat: custom.datePickerDateFormat});
  			
  			$("#entityform textarea").first().focus();
  			$('#entityform input').first().focus();
  		}
  }).dialog('open');
}

function popupDialogWithPostOnlyFormView(postUrl, submitType, titleCode, templateSelector, width, height, saveSuccessFunction, minOffset, defaultOffset, maxOffset) {
		var dialogDiv = $("<div id='dialog-form'></div>");
		var data = new Object();
		var formHtml = $(templateSelector).render(data);
		dialogDiv.append(formHtml);
		
		var saveButton = doI18N('dialog.button.save');
		var cancelButton = doI18N('dialog.button.cancel');
		var buttonsOpts = {};		
		buttonsOpts[saveButton] = function() {
			$('.multiSelectedItems option').each(function(i) {  
		    	   		$(this).attr("selected", "selected");  
		    		});

			if (document.changePasswordForm!=undefined) newPassword = document.changePasswordForm.password.value;

			var newFormData = JSON.stringify($('#entityform').serializeObject());
			executeAjaxRequest(postUrl, submitType, newFormData, saveSuccessFunction, formErrorFunction);
		};
		buttonsOpts[cancelButton] = function() {$(this).dialog( "close" );};
		
		dialogDiv.dialog({
		  		title: doI18N(titleCode), 
		  		width: width, 
		  		height: height, 
		  		modal: true,
		  		buttons: buttonsOpts,
		  		close: function() {
		  			// if i dont do this, theres a problem with errors being appended to dialog view second time round
		  			$(this).remove();
				},
		  		open: function (event, ui) {
		  			$('.multiadd').click(function() {  
		  			     return !$('.multiNotSelectedItems option:selected').remove().appendTo('#selectedItems');  
		  			});
		  			
		  			$('.multiremove').click(function() {  
		  				return !$('.multiSelectedItems option:selected').remove().appendTo('#notSelectedItems');  
		  			});
		  			
		  			$('.datepickerfield').datepicker({constrainInput: true, minDate: minOffset, defaultDate: defaultOffset, maxDate: maxOffset, dateFormat: custom.datePickerDateFormat});
		  			
		  			$("#entityform textarea").first().focus();
		  			$('#entityform input').first().focus();
		  		}
		  }).dialog('open');
}

function popupConfirmationDialogAndPost(url, submitType, titleCode, width, height, tabIndex, saveSuccessFunction, jsonString) {
		    var dialogDiv = $("<div id='dialog-form'><div id='formerrors'></div>" + doI18N('text.confirmation.required') + "</div>");
		  
		  	var confirmButton = doI18N('dialog.button.confirm');
			var cancelButton = doI18N('dialog.button.cancel');
			
			var buttonsOpts = {};
			buttonsOpts[confirmButton] = function() {
				executeAjaxRequest(url, submitType, jsonString, saveSuccessFunction, formErrorFunction);
			};
			
			buttonsOpts[cancelButton] = function() {$(this).dialog( "close" );};
		  
		  dialogDiv.dialog({
		  		title: doI18N(titleCode), 
		  		width: width, 
		  		height: height, 
		  		modal: true,
		  		buttons: buttonsOpts,
		  		close: function() {
		  			// if i dont do this, theres a problem with errors being appended to dialog view second time round
		  			$(this).remove();
				},
		  		open: function (event, ui) {}
		  	}).dialog('open');
}



//sign-out
function signOut(containerDivName) {
	base64 = "";
	$("#" + containerDivName).html("");
	//console.log("Close the Browser for a Complete Sign Out");
}


//Audit functionality
function auditSearch() {

	var successFunction = function(data, textStatus, jqXHR) {
			var html = $("#auditSearchTemplate").render(data);
			
			$("#content").html(html);  
			
			var datetimeOptions = {
							dateFormat: 'yy-mm-dd',
							timeFormat: "HH:mm:ss",
							showSecond: true
							}

			$('#auditdatetimefrom').datetimepicker(datetimeOptions);
			$('#auditdatetimeto').datetimepicker(datetimeOptions);
			$('#auditcheckeddatetimefrom').datetimepicker(datetimeOptions);
			$('#auditcheckeddatetimeto').datetimepicker(datetimeOptions);

			$('#searchaudit').button().click(function(e) {
				var validated = true;
				var auditSearchOptions = {};
				var auditAction = $('#auditaction').find(":selected").val();
				if (!(auditAction == "ALL")) auditSearchOptions.actionName = auditAction;

				var auditEntity = $('#auditentity').find(":selected").val();
				if (!(auditEntity == "ALL")) auditSearchOptions.entityName = auditEntity;

				var auditResourceId = $('#auditresourceId').val();
				if (auditResourceId > "") 
				{
					if (parseInt(auditResourceId) != auditResourceId )
					{
						//console.log(doI18N("resourceId.not.integer"));
						validated = false;
					}
					else auditSearchOptions.resourceId = parseInt(auditResourceId);
				}

				var auditMaker = $('#auditmaker').find(":selected").val();
				if (!(auditMaker == "ALL")) auditSearchOptions.makerId = auditMaker;

				var auditChecker = $('#auditchecker').find(":selected").val();
				if (!(auditChecker == "ALL")) auditSearchOptions.checkerId = auditChecker;

				var auditMadeOnDateTimeFrom = $('#auditdatetimefrom').val();
				if (auditMadeOnDateTimeFrom > "") auditSearchOptions.makerDateTimeFrom = auditMadeOnDateTimeFrom;

				var auditMadeOnDateTimeTo = $('#auditdatetimeto').val();
				if (auditMadeOnDateTimeTo > "") auditSearchOptions.makerDateTimeTo = auditMadeOnDateTimeTo;

				var auditCheckedOnDateTimeFrom = $('#auditcheckeddatetimefrom').val();
				if (auditCheckedOnDateTimeFrom > "") auditSearchOptions.checkerDateTimeFrom = auditCheckedOnDateTimeFrom;

				var auditCheckedOnDateTimeTo = $('#auditcheckeddatetimeto').val();
				if (auditCheckedOnDateTimeTo > "") auditSearchOptions.checkerDateTimeTo = auditCheckedOnDateTimeTo;

				var auditProcessingResult = $('#auditprocessingresult').val();
				if (!(auditProcessingResult == "ALL")) auditSearchOptions.processingResult = auditProcessingResult;

				if (validated == true) viewAudits(auditSearchOptions);

			    	e.preventDefault();
			});

	};
		
  	executeAjaxRequest('audit/searchtemplate', 'GET', "", successFunction, formErrorFunction);

}

function viewAudits(auditSearchOptions) {

	var url = 'audit';
	var paramCount = 1;
	for (var i in auditSearchOptions)
	{
		if (paramCount > 1) url += "&"
		else url += "?";
		url += encodeURIComponent(i) + "=" + encodeURIComponent(auditSearchOptions[i]);
		paramCount = paramCount + 1;
	}	

	var successFunction = function(data, textStatus, jqXHR) {

				var crudObject = new Object();
				crudObject.crudRows = data;
				var html = $("#auditListTemplate").render(crudObject);
				$("#auditSearchResults").html(html);  


				$("a.viewaudit").click( function(e) {
					
					var linkId = this.id;
					var entityId = linkId.replace("viewaudit", "");
					viewAuditEntry(entityId)
					e.preventDefault();
				});
				

				var oTable = displayEnhancedListTable("auditstable");
	};
		
	executeAjaxRequest(url, 'GET', "", successFunction, formErrorFunction);
}

function viewAuditEntry(auditId) {

	var url = 'audit/' + auditId;

	var successFunction = function(data, textStatus, jqXHR) {

		var dialogDiv = $("<div id='dialog-form'></div>");
		var obj = new Object();
		obj.crudRows = data;
		var html = $("#auditEntryTemplate").render(obj);
		dialogDiv.append(html);
		
		var closeButton = doI18N('dialog.button.close');
		var buttonsOpts = {};	
		buttonsOpts[closeButton] = function() {$(this).dialog( "close" );};
		
		dialogDiv.dialog({
		  		title: doI18N("view.audit.entry"), 
				width : custom.fitPopupWidth(),
				height : custom.fitPopupHeight(),
		  		modal: true,
		  		buttons: buttonsOpts,
	  			close: function() {
	  				$(this).remove();
				}
		  }).dialog('open');

	};
		
	executeAjaxRequest(url, 'GET', "", successFunction, formErrorFunction);
}





//utility functions

highlightMissingXlations = "N";
function doI18N(xlateStr, params) { 
	if (highlightMissingXlations == "Y") return jQuery.i18n.prop(xlateStr, params)
	else
	{
		var xlated = jQuery.i18n.prop(xlateStr, params,arguments[2],arguments[3],arguments[4],arguments[5],arguments[6]);
		if (xlated.substr(0,1) == "[" && xlated.substr(xlated.length - 1, 1) == "]") return xlated.substr(1, xlated.length - 2)
		else return xlated;
	}
}


function initialiseAndShowLogon() {
	jQuery.support.cors = true;

	setInitialCulture();

	jsViewsRegisterHelpers();

	baseApiUrl = getBaseApiURL(window.location.href);

	applicationProfile = "ALL";
	if (QueryParameters["applicationProfile"]) applicationProfile = QueryParameters["applicationProfile"];

	applicationMode = "PROD";
	if (QueryParameters["mode"]) applicationMode = QueryParameters["mode"];

	showLogon("container");
}

function getBaseApiURL(docURL)
{
	var l = getLocation(docURL);
	
	var baseApiUrl = "";
	if (l.hostname == "localhost" || l.hostname == "" || l.hostname == null || l.hostname == "ec2-54-252-41-42.ap-southeast-2.compute.amazonaws.com") {
		baseApiUrl = "https://ec2-54-252-41-42.ap-southeast-2.compute.amazonaws.com:8443/mifosng-provider/api/v1/";
	}
	else if (l.hostname == "demo.openmf.org") {
		baseApiUrl = "/mifosng-provider/api/v1/";
	} else {
		baseApiUrl = "https://ec2-46-137-62-163.eu-west-1.compute.amazonaws.com:8443/mifosng-provider/api/v1/";
	}
	
	if (QueryParameters["baseApiUrl"]) {
		baseApiUrl = QueryParameters["baseApiUrl"];
	}
    
    return baseApiUrl; 
}

getLocation = function(href) {
    var l = document.createElement("a");
    l.href = href;
    return l;
};

function setInitialCulture() {

	baseCulture = 'en';
	if (QueryParameters["baseCulture"]) baseCulture = QueryParameters["baseCulture"];
	switch(baseCulture)
	{
			case "en":
  				break;
			case "fr":
  				break;
			case "es":
  				break;
			case "pt":
  				break;
			case "zh":
  				break;
			default:
  				//console.log("The culture/language you specified (" + baseCulture + ") isn't available so will default to 'en' (English).");
				baseCulture = 'en';
	}
	setCulture(baseCulture);	
}

function setCultureReshowFirstPage(cultureVal) {
	setCulture(cultureVal);
	showMainContainer("container");
	custom.showFirstPage();
}


function setCulture(cultureVal) {
	currentCulture = cultureVal;
    	Globalize.culture(currentCulture);
    	
    	$.datepicker.setDefaults( $.datepicker.regional[currentCulture]);
 
    	var tenantTranslation = "messages-tenant-" + tenantIdentifier;
    	jQuery.i18n.properties({
			name:['messages', 'messages-platform-validation', 'messages-savings', tenantTranslation], 
			path: 'resources/global-translations/',
			mode:'map',
			cache: true,
			language: currentCulture,
			callback: function() {
			}
		});

	$.timepicker.regional[currentCulture] = {
		timeOnlyTitle: doI18N('timeOnlyTitle'),
		timeText: doI18N('timeText'),
		hourText: doI18N('hourText'),
		minuteText: doI18N('minuteText'),
		secondText: doI18N('secondText'),
		millisecText: doI18N('millisecText'),
		timezoneText: doI18N('timezoneText'),
		currentText: doI18N('currentText'),
		closeText: doI18N('closeText'),
		amNames: ['AM', doI18N('amNames'),],
		pmNames: ['PM', doI18N('pmNames'),],
		isRTL: false
	};
	$.timepicker.setDefaults($.timepicker.regional[currentCulture]);
}


QueryParameters = (function()
{
    var result = {};
    if (window.location.search)
    {
        // split up the query string and store in an associative array
        var params = window.location.search.slice(1).split("&");
        for (var i = 0; i < params.length; i++)
        {
            var tmp = params[i].split("=");
            result[tmp[0]] = unescape(tmp[1]);
        }
    }
    return result;
}());


function showNotAvailableDialog(titleCode) {
		var dialogDiv = $("<div id='notavailable-dialog-form'></div>");
		
		dialogDiv.append("<p>" + doI18N('dialog.messages.functionality.not.available') + "</p>");
		
		var okButton = doI18N('dialog.button.ok');
		
		var buttonsOpts = {};
		buttonsOpts[okButton] = function() {$(this).dialog("close");};
		
		dialogDiv.dialog({
	  		title: doI18N(titleCode), 
	  		width: 300, 
	  		height: 200, 
	  		modal: true,
	  		buttons: buttonsOpts,
	  		close: function() {
	  			// if i dont do this, theres a problem with errors being appended to dialog view second time round
	  			$(this).remove();
			}
		 }).dialog('open');
}
	
function showJson(commandAsJson) {

	jsonObj = JSON.parse(commandAsJson);
	if (jsonObj.permissions) jsonObj = jsonObj.permissions;

	var html = "";

	var colNo = 0;
	for (var i in jsonObj)
	{

		if ((i != "dateFormat") && (i != "locale"))
		{
			colNo += 1;
			if (colNo == 1) html += "<tr>";
			else html += '<td width="100px"></td>';

			html += "<td>";
			html += "<b>" + doI18N(i) + ": </b>";
			html += "</td>";
			html += "<td>";
			html += jsonObj[i];
			html += "</td>";

			if (colNo == 2) 
			{
				colNo = 0;
				html += "</tr>";
			}
		}
	}
	if (colNo == 1) html += '<td></td><td></td><td></td></tr>';

	if (html > "") html = '<table width="100%">' + html + "</table>";
	
	return html;
}

$.fn.serializeObject = function(serializationOptions)
{
	var o = {};
	var a;
	if (serializationOptions !== null && serializationOptions !== undefined) {
		a = this.serializeArray(serializationOptions);
	} else {
		a = this.serializeArray({checkboxesAsBools: true});
	}
	
	var arrayName, propertyName, index;

	$.each(a, function() {
		
		if (this.name === 'notSelectedCurrencies' || this.name === 'notSelectedRoles' || this.name === 'notSelectedServices'
	    		|| this.name === 'notSelectedClients' || this.name === 'notSelectedCharges') {
			// do not serialize
		} else if (this.name.indexOf('[') !== -1) { //serialize as separate object
			arrayName = this.name.substring(0, this.name.indexOf("["));
			if (o[arrayName] === undefined){
				o[arrayName] = [];				
			}
			index = parseInt(this.name.substring(this.name.indexOf("[") + 1, this.name.indexOf("]")));
			if (index > 0){
				index -= 1;
			}
			if (o[arrayName][index] === undefined){
				o[arrayName][index] = {};
			}
			propertyName = this.name.substring(this.name.lastIndexOf("[") + 1, this.name.lastIndexOf("]"));
			o[arrayName][index][propertyName] = this.value || '';
		} else  {
		    if (o[this.name] !== undefined) {
		        if (!o[this.name].push) {
		            o[this.name] = [o[this.name]];
		        }
		        o[this.name].push(this.value || '');
		    } else {
		    	
		    	if (this.name === 'selectedItems' || this.name === 'notSelectedItems' || this.name === 'currencies' || this.name === 'services'
	        		|| this.name === 'roles' || this.name === 'clientMembers' || this.name === 'charges' || this.name === 'loans') {
		    		o[this.name] = new Array();
		    		o[this.name].push(this.value || '');
		    	} else {
		    		o[this.name] = this.value || '';	
		    	}
		    }
		}
	});
	
	//clean serialized arrays - remove nulls 
	$.each(o, function(key, value){
		if (value instanceof Array){
			o[key] = value.filter(function(e){return e}); 
		}
	})

	return o;
};

$.fn.serializeArray = function (options) {
    var o = $.extend({
        checkboxesAsBools: false
    }, options || {});

    var rselectTextarea = /select|textarea/i;
    var rinput = /text|hidden|password|search/i;

    return this.map(function () {
        return this.elements ? $.makeArray(this.elements) : this;
    })
    .filter(function () {
        return this.name && !this.disabled &&
            (this.checked
            || (o.checkboxesAsBools && this.type === 'checkbox')
            || rselectTextarea.test(this.nodeName)
            || rinput.test(this.type));
    })
        .map(function (i, elem) {
            var val = $(this).val();
            return val == null ?
            null :
            $.isArray(val) ?
            $.map(val, function (val, i) {
                return { name: elem.name, value: val };
            }) :
            {
                name: elem.name,
                value: (o.checkboxesAsBools && this.type === 'checkbox') ? 
                    (this.checked ? 'true' : 'false') :
                    val
            };
        }).get();
};

	
function displayListTable(tableDiv) {
	var asInitVals = new Array();
	var oTable = $("#" + tableDiv).dataTable( {
		
					"bSort": true,
					"aaSorting": [], //disable initial sort
					"bInfo": true,
					"bJQueryUI": true,
					"bRetrieve": true,
					"bScrollCollapse": true,
					//"bPaginate": false,
					"sScrollY": "300px",
					"bPaginate": false,
					"bLengthChange": true,
					"bFilter": true,
					"bAutoWidth": true,
					"bFiltered":true,
					"oPaginate":false,	
			       "bScrollCollapse": true,
					
					
					"oLanguage": {
								"sEmptyTable": doI18N("rpt.no.entries"),
								"sZeroRecords": doI18N("rpt.no.matching.entries"),
								"sInfo": doI18N("rpt.showing") + " _START_ " + doI18N("rpt.to") + " _END_ " + doI18N("rpt.of") + " _TOTAL_ " + doI18N("rpt.records"),
								"SInfoFiltered": "(" + doI18N("rpt.filtered.from") + " _max_ " + doI18N("rpt.total.entries") + ")",
        							"oPaginate": {
            									"sFirst"    : doI18N("rpt.first"),
            									"sLast"     : doI18N("rpt.last"),
            									"sNext"     : doI18N("rpt.next"),
            									"sPrevious" : doI18N("rpt.previous")
        									},
								"sLengthMenu": doI18N("rpt.show") + " _MENU_ " + doI18N("rpt.entries"),
								"sSearch": doI18N("rpt.search"),
								"bFiltered":doI18N("rpt.search")
								
								
					}
				} );
	jQuery("tfoot input").keyup( function () {
		
		  oTable.fnFilter( this.value, $("tfoot input").index(this) );
	} );

	jQuery("tfoot input").each( function (i) {
	asInitVals[i] = this.value;
	} );

	jQuery("tfoot input").focus( function (i) {
	if ( this.className == "search_init" )
	{
	this.className = "";
	this.value = "";
	}
	} );

	jQuery("tfoot input").blur( function (i) {
	if ( this.value == "" )
	{
	this.className = "search_init";
	this.value = asInitVals[jQuery("tfoot input").index(this)];
	}
	} );
	return oTable;
	
}

function newTable(tableDiv){
	var oTable;
	var asInitVals = new Array();

		 oTable = $("#" + tableDiv).dataTable( {
		"oPaginate":true

	
	} );
	
	
	
	
		
	
}

function displayEnhancedListTable(tablediv) {

	return  $("#" + tablediv).dataTable( {
		"aaSorting": [], //disable initial sort
		"sDom": 'lfTip<"top"<"clear">>rt',
		"oTableTools": {
				"aButtons": [{	"sExtends": "copy",
							"sButtonText": doI18N("Copy to Clipboard")
									}, 
						{	"sExtends": "xls",
							"sButtonText": doI18N("Save to CSV")
						}
						],
				"sSwfPath": "resources/libs/DataTables-1.8.2/extras/TableTools/media/swf/copy_cvs_xls.swf"
			        },
			        
		"sPaginationType": "full_numbers",
		"oLanguage": {
					"sEmptyTable": doI18N("rpt.no.entries"),
					"sZeroRecords": doI18N("rpt.no.matching.entries"),
					"sInfo": doI18N("rpt.showing") + " _START_ " + doI18N("rpt.to") + " _END_ " + doI18N("rpt.of") + " _TOTAL_ " + doI18N("rpt.records"),
					"SInfoFiltered": "(" + doI18N("rpt.filtered.from") + " _max_ " + doI18N("rpt.total.entries") + ")",
        				"oPaginate": {
            						"sFirst"    : doI18N("rpt.first"),
            						"sLast"     : doI18N("rpt.last"),
            						"sNext"     : doI18N("rpt.next"),
            						"sPrevious" : doI18N("rpt.previous")
        						},
					"sLengthMenu": doI18N("rpt.show") + " _MENU_ " + doI18N("rpt.entries"),
					"sSearch": doI18N("rpt.search")
				},
		"bDeferRender": true,
		"bProcessing": true,
		  "bScrollCollapse": true,
		"aLengthMenu": [[5, 10, 25, 50, 100, -1], [5, 10, 25, 50, 100, "All"]]
	})

}

function displayListTableWithExportOption(tablediv) {

	return  $("#" + tablediv).dataTable( {
					"bSort": true,
					"aaSorting": [], //disable initial sort
					"bInfo": true,
					"sDom": 'lfTip<"top"<"clear">>rt',
					"oTableTools": {
						"aButtons": [{	"sExtends": "copy",
									"sButtonText": doI18N("Copy to Clipboard")
											}, 
								{	"sExtends": "xls",
									"sButtonText": doI18N("Save to CSV")
								}
								],
						"sSwfPath": "resources/libs/DataTables-1.8.2/extras/TableTools/media/swf/copy_cvs_xls.swf"
				     },
					"bJQueryUI": true,
					"bRetrieve": false,
					"bScrollCollapse": true,
					"bPaginate": false,
					"bLengthChange": false,
					"bFilter": false,
					"bAutoWidth": false,
					"oLanguage": {
								"sEmptyTable": doI18N("rpt.no.entries"),
								"sZeroRecords": doI18N("rpt.no.matching.entries"),
								"sInfo": doI18N("rpt.showing") + " _START_ " + doI18N("rpt.to") + " _END_ " + doI18N("rpt.of") + " _TOTAL_ " + doI18N("rpt.records"),
								"SInfoFiltered": "(" + doI18N("rpt.filtered.from") + " _max_ " + doI18N("rpt.total.entries") + ")",
        							"oPaginate": {
            									"sFirst"    : doI18N("rpt.first"),
            									"sLast"     : doI18N("rpt.last"),
            									"sNext"     : doI18N("rpt.next"),
            									"sPrevious" : doI18N("rpt.previous")
        									},
								"sLengthMenu": doI18N("rpt.show") + " _MENU_ " + doI18N("rpt.entries"),
								"sSearch": doI18N("rpt.search")
					}
				} );
}




function simpleOptionsHtml(htmlOptions) {

	//var htmlVar = '<div id="inputarea"></div><div id="schedulearea"></div>';
	var htmlVar = '<div>';
	htmlVar += '<span style="float: left">';
	htmlVar += htmlOptions;
	htmlVar += '</span>';
	htmlVar += '</div>';
	htmlVar += '<br><br>';
	htmlVar += '<div id="listplaceholder" ></div>';
	return htmlVar;
}


//Error functions		
function removeErrors(placeholderDiv) {
		// remove error class from all input fields
		var $inputs = $('#entityform :input');
		
	    $inputs.each(function() {
	        $(this).removeClass("ui-state-error");
	    });
		
	  	$(placeholderDiv).html("");
}
	
function handleXhrError(jqXHR, textStatus, errorThrown, templateSelector, placeholderDiv) {
	  	if (jqXHR.status === 0) {
		    //console.log('No connection. Verify application is running.');
	  	} else if (jqXHR.status == 401) {
			//console.log('Unauthorized. [401]');
		} else if (jqXHR.status == 404) {
		    //console.log('Requested page not found. [404]');
		} else if (jqXHR.status == 405) {
			//console.log('HTTP verb not supported [405]: ' + errorThrown);
		} else if (jqXHR.status == 500) {
		    //console.log('Internal Server Error [500].');
		} else if (errorThrown === 'parsererror') {
		    //console.log('Requested JSON parse failed.');
		} else if (errorThrown === 'timeout') {
		    //console.log('Time out error.');
		} else if (errorThrown === 'abort') {
		    //console.log('Ajax request aborted.');
		} else {
			
			removeErrors(placeholderDiv);
			
		  	var jsonErrors = JSON.parse(jqXHR.responseText);
		  	var valErrors = jsonErrors.errors;
		  	var errorArray = new Array();
		  	var arrayIndex = 0;
		  	$.each(valErrors, function() {
		  	  var fieldId = '#' + this.parameterName;
		  	  $(fieldId).addClass("ui-state-error");
		  	  
		  	  var errorObj = new Object();
		  	  errorObj.field = this.parameterName;
		  	  errorObj.code = this.userMessageGlobalisationCode;
		  	  
		  	  var argArray = new Array();
		  	  var argArrayIndex = 0;
		  	  $.each(this.args, function() {
		  		argArray[argArrayIndex] = this.value;
		  		argArrayIndex++;
		  	  });
		  	  // hardcoded support for six arguments
		  	  errorObj.message = doI18N(this.userMessageGlobalisationCode, argArray[0], argArray[1], argArray[2], argArray[3], argArray[4], argArray[5]);
		  	  errorObj.value = this.value;
		  	  
		  	  errorArray[arrayIndex] = errorObj;
		  	  arrayIndex++
		  	});
		  	
		  	var templateArray = new Array();
		  	var templateErrorObj = new Object();
		  	templateErrorObj.title = doI18N('error.msg.header');
		  	templateErrorObj.errors = errorArray;
		  	
		  	templateArray[0] = templateErrorObj;
		  	
		  	var formErrorsHtml = $(templateSelector).render(templateArray);
		  	
		  	$(placeholderDiv).append(formErrorsHtml);
		}
}

function jsViewsRegisterHelpers() {
	$.views.registerHelpers(custom.helperFunctions);
}
function postInterest(){
	var url = 'depositaccounts/postinterest';
	var width = 400; 
	var height = 225;
							
	popupConfirmationDialogAndPost(url, 'POST', 'dialog.title.confirmation.required', width, height, 0, saveSuccessFunctionReloadClientListing);
}

function showSavingAccount(accountId, productName) {
	var newSavingTabId='saving'+accountId+'tab';
	//show existing tab if this Id is already present
	if(tabExists(newSavingTabId)){
		var index = $('#newtabs a[href="#'+ newSavingTabId +'"]').parent().index(); 
		$('#newtabs').tabs('select', index);
	}
	//else create new tab and set identifier properties
	else{
		var title = productName + ": #" + accountId ;			    
		$newtabs.tabs( "add", "unknown.html", title);
		loadSavingAccount(accountId);
		//add ids and titles to newly added div's and a'hrefs
		var lastAHref=$('#newtabs> ul > li:last > a');
		var lastDiv=$('#newtabs > div:last')
		var lastButOneDiv=$('#newtabs > div:last').prev();
		lastAHref.attr('href','#saving'+accountId+'tab');
		lastButOneDiv.attr('id',newSavingTabId);
		//the add functionality seems to be adding a dummy div at the end 
		//am deleting the same to make div manipulation easier
		lastDiv.remove();
		}
}

function loadSavingAccount(accountId) {
	
	var accountUrl = 'savingaccounts/' + accountId+ "?associations=all";

	var errorFunction = function(jqXHR, status, errorThrown, index, anchor) {
    	handleXhrError(jqXHR, status, errorThrown, "#formErrorsTemplate", "#formerrors");
        //$(anchor.hash).html("error occured while ajax loading.");
	};
	
	var successFunction = function(data, status, xhr) {
    	
		var currentTabIndex = $newtabs.tabs('option', 'selected');
    	var currentTabAnchor = $newtabs.data('tabs').anchors[currentTabIndex];
    	
    	var tableHtml = $("#savingAccountDataTabTemplate").render(data);
    	
    	var data = new Object();
		
		var currentTab = $("#newtabs").children(".ui-tabs-panel").not(".ui-tabs-hide");
		currentTab.html(tableHtml);

		var curTabID = currentTab.prop("id");
		
		var $savingtabs = $("#savingtabs" + accountId).tabs({
			"show": function(event, ui) {
				var curTab = $('#newtabs .ui-tabs-panel:not(.ui-tabs-hide)');
      			var curTabID = curTab.prop("id")
			}
		});
		
		$('.rejectsavingapplication').button().click(function(e) {
			var linkId = this.id;
			var savingAccountId = linkId.replace("rejectsavingbtn", "");
			var postUrl = 'savingaccounts/' + savingAccountId + '?command=reject';
			var getUrl = 'savingaccounts/' + savingAccountId + '?template=true';
			var templateSelector = "#stateTransitionDepositFormTemplate";
			var width = 400; 
			var height = 250;

			popupDialogWithFormView(getUrl,postUrl, 'POST', 'dialog.button.reject.depositAccount', templateSelector, width, height, saveSuccessFunctionReloadClient);
		    e.preventDefault();
		});
		$('button.rejectsavingapplication span').text(doI18N('dialog.button.reject.depositAccount'));
		
		$('.approvesavingapplication').button().click(function(e) {
			var linkId = this.id;
			var savingAccountId = linkId.replace("savingapprovebtn", "");
			var postUrl = 'savingaccounts/' + savingAccountId + '?command=approve';
			var templateSelector = "#stateTransitionSavingFormTemplateForApprove";
			var width = 500; 
			var height = 425;
			var getUrl = 'savingaccounts/' + savingAccountId + '?template=true';
			
			eval(genSaveSuccessFunctionReloadSaving(savingAccountId));
			popupDialogWithFormView(getUrl, postUrl, 'POST', 'dialog.title.approve.depositAccount', templateSelector, width, height, saveSuccessFunctionReloadSaving);
		    
			e.preventDefault();
		});
		$('button.approvesavingapplication span').text(doI18N('dialog.title.approve.depositAccount'));
		
		$('.withdrawsavingamount').button().click(function(e) {
			var linkId = this.id;
			var savingAccountId = linkId.replace("savingwithdrawbtn", "");
			var postUrl = 'savingaccounts/' + savingAccountId + '?command=withdraw';
			var getUrl = 'savingaccounts/' + savingAccountId + '?template=true';
			var templateSelector = "#withdrawSavingAmountFormTemplate";
			var width = 400; 
			var height = 280;

			eval(genSaveSuccessFunctionReloadSaving(savingAccountId));
			popupDialogWithFormView(getUrl, postUrl, 'POST', 'dialog.title.withdraw.deposit.amount', templateSelector, width, height, saveSuccessFunctionReloadSaving);
		    
			e.preventDefault();
		});
		$('button.withdrawsavingamount span').text(doI18N('label.withdraw.deposit.amount'));
		
		$('.modifysavingapplication').button().click(function(e) {
			var linkId = this.id;
			var savingAccountId = linkId.replace("modifysavingbtn", "");
			var postUrl = 'savingaccounts/' + savingAccountId;
			var getUrl = 'savingaccounts/' + savingAccountId + '?template=true&?associations=all';
			var templateSelector = "#modifySavingAccountFormTemplate";
			var width = 850; 
			var height = 430;

			eval(genSaveSuccessFunctionReloadSaving(savingAccountId));
			popupDialogWithFormView(getUrl, postUrl, 'PUT', 'dialog.title.edit.deposit.account', templateSelector, width, height, saveSuccessFunctionReloadSaving);
		    
			e.preventDefault();
		});
		$('button.modifysavingapplication span').text(doI18N('label.modify.deposit.account'));

		
		$('.undoapprovesavingapplication').button().click(function(e) {
			var linkId = this.id;
			var savingAccountId = linkId.replace("undosavingapprovebtn", "");
			var postUrl = 'savingaccounts/' + savingAccountId + '?command=undoapproval';
			var templateSelector = "#undoStateTransitionLoanFormTemplate";
			var width = 450; 
			var height = 260;

			eval(genSaveSuccessFunctionReloadSaving(savingAccountId));
			popupDialogWithPostOnlyFormView(postUrl, 'POST', 'dialog.title.undo.deposit.approval', templateSelector, width, height, saveSuccessFunctionReloadSaving);
		    
			e.preventDefault();
		});
		$('button.undoapprovesavingapplication span').text(doI18N('label.undo.approval'));
		
		$('.savingwithdrawnbyapplicant').button().click(function(e) {
			var linkId = this.id;
			var savingAccountId = linkId.replace("withdrawbyapplicantbtn", "");
			var getUrl = 'savingaccounts/' + savingAccountId + '?template=true';
			var postUrl = 'savingaccounts/' + savingAccountId + '?command=withdrewbyclient';
			var templateSelector = "#stateTransitionDepositFormTemplate";
			var width = 400; 
			var height = 250;

			popupDialogWithFormView(getUrl,postUrl, 'POST', 'dialog.title.loan.withdrawn.by.client', templateSelector, width, height, saveSuccessFunctionReloadClient);
		    e.preventDefault();
		});
		$('button.savingwithdrawnbyapplicant span').text(doI18N('dialog.title.loan.withdrawn.by.client'));
		
		$('.paysavinginstallment').button().click(function(e) {
			var linkId = this.id;
			var savingAccountId = linkId.replace("savingpaymentbtn", "");
			var getUrl = 'savingaccounts/' + savingAccountId + '?template=true';
			var postUrl = 'savingaccounts/' + savingAccountId + '?command=depositmoney';
			var templateSelector = "#paySavingInstallmentsFormTemplate";
			var width = 400; 
			var height = 250;
			eval(genSaveSuccessFunctionReloadSaving(savingAccountId));
			popupDialogWithFormView(getUrl,postUrl, 'POST', 'dialog.title.saving.pay.installment.due', templateSelector, width, height, saveSuccessFunctionReloadSaving);
		    e.preventDefault();
		});
		$('button.paysavinginstallment span').text(doI18N('dialog.title.saving.pay.installment.due'));
		
		$('.deletesavingapplication').button().click(function(e) {
			var linkId = this.id;
			var savingAccountId = linkId.replace("deletesavingbtn", "");
			var url = 'savingaccounts/' + savingAccountId;
			var width = 400; 
			var height = 225;
									
			popupConfirmationDialogAndPost(url, 'DELETE', 'dialog.title.confirmation.required', width, height, 0, saveSuccessFunctionReloadClient);
		    e.preventDefault();
	});
	$('button.deletesavingapplication span').text(doI18N('dialog.button.delete.loan'));
		
	}
		
	executeAjaxRequest(accountUrl, 'GET', "", successFunction, errorFunction);	
}
function addILSaving(clientId) {
	setAddSavingContent("content");

	eval(genAddSavingSuccessVar(clientId));

	   executeAjaxRequest('savingaccounts/template?clientId=' + clientId, 'GET', "", successFunction, formErrorFunction);	
	}	
	function genAddSavingSuccessVar(clientId) {

	return 'var successFunction = function(data, textStatus, jqXHR) { ' +
	' var formHtml = $("#newSavingAccountFormTemplateMin").render(data);' +
	' $("#inputarea").html(formHtml);' +
	' $("#productId").change(function() {' +
	' var productId = $("#productId").val();' +
	' repopulateSavingAccountForm(' + clientId + ', productId);' +
	' });' +
	' };'
	}

function repopulateSavingAccountForm(clientId, productId){
	successFunction = function(data, textStatus, jqXHR) {
		var formHtml = $("#newSavingAccountFormTemplate").render(data);
		
		$("#inputarea").html(formHtml);
		
		$('#productId').change(function() {
			var productId = $('#productId').val();
			repopulateSavingAccountForm(clientId, productId);
		});
		
		$('.datepickerfield').datepicker({constrainInput: true, defaultDate: 0, maxDate: 0, dateFormat: custom.datePickerDateFormat});
		$('.datepickerfieldnoconstraint').datepicker({constrainInput: true, defaultDate: 0, dateFormat: custom.datePickerDateFormat});
		
		calculateSavingSchedule();
		
		$('#commencementDate').change(function() {
			calculateSavingSchedule();
		});

		$('#externalId').change(function() {
			calculateSavingSchedule();
		});

		$('#savingsDepositAmountPerPeriod').change(function() {
			calculateSavingSchedule();
		});

		$('#depositEvery').change(function() {
			calculateSavingSchedule();
		});
						
		$('#tenure').change(function() {
			calculateSavingSchedule();
		});
		
		$('#tenureType').change(function() {
			calculateSavingSchedule();
		});

		$('#savingInterestRate').change(function() {
			calculateSavingSchedule();
		});
		$('#recurringInterestRate').change(function() {
			calculateSavingSchedule();
		});
		
		$('#interestCalculationMethod').change(function() {
			calculateSavingSchedule();
		});

		$('#interestType').change(function() {
			calculateSavingSchedule();
		});
		
		$('#submitsavingaccountapp').button().click(function(e) {
			submitSavingAccountApplication(clientId);
		    e.preventDefault();
		});
		$('button#submitsavingaccountapp span').text(doI18N('dialog.button.submit'));
		
		$('#cancelsavingaccountapp').button().click(function(e) {
  			showILClient(clientId);
		    e.preventDefault();
		});
		$('button#cancelsavingaccountapp span').text(doI18N('dialog.button.cancel'));
	}
	executeAjaxRequest('savingaccounts/template?clientId=' + clientId + '&productId=' + productId, 'GET', "", successFunction, formErrorFunction);
}	


	function submitSavingAccountApplication(clientId) {
	
	var newFormData = JSON.stringify($('#entityform').serializeObject());
	
	var successFunction =  function(data, textStatus, jqXHR) {
	  				showILClient(clientId);
		  };
	
	executeAjaxRequest('savingaccounts', "POST", newFormData, successFunction, formErrorFunction);	  

  } 
	
  function genSaveSuccessFunctionReloadSaving(savingAccountId) {

		return 'var saveSuccessFunctionReloadSaving = function(data, textStatus, jqXHR) { ' + 
						  	' $("#dialog-form").dialog("close");' +
							' loadSavingAccount(' + savingAccountId + ');' +
							' clientDirty = true;' +
						'};';
	}	
  
  function checkSubmit(e, logonDivName, username, password)
  {
     if(e && e.keyCode == 13)
     {
    	 setBasicAuthKey(logonDivName, username, password);
     }
  }
  
	function calculateSavingSchedule() {
		
		var newFormData = JSON.stringify($('#entityform').serializeObject());
    	
		var successFunction = function(data, textStatus, jqXHR) {
				  		removeErrors("#formerrors");
				  		var savingScheduleHtml = $("#newSavingScheduleTemplate").render(data);
				  		$("#schedulearea").html(savingScheduleHtml);
		};
		
		var errorFunction = function(jqXHR, textStatus, errorThrown) {
						 $("#schedulearea").html("");
						 handleXhrError(jqXHR, textStatus, errorThrown, "#formErrorsTemplate", "#formerrors");
		};
		executeAjaxRequest('savingaccounts?command=calculateSavingSchedule', "POST", newFormData, successFunction, errorFunction);	  
	}
	
	/*function showTenure() {
		  var e = document.getElementById("tenureType");
		  var str=e.options[e.selectedIndex].value;
		  if(str == 1) {
			document.getElementById("tenure").style.display = "inline";
		 } else { 
			document.getElementById("tenure").style.display = "none";
		 }
		}*/
	
	function postInterestForSavingAccounts(){
		var url = 'savingaccounts/postinterest';
		var width = 400; 
		var height = 225;
								
		popupConfirmationDialogAndPost(url, 'POST', 'dialog.title.confirmation.required', width, height, 0, saveSuccessFunctionReloadClientListing);
	}

/*function addPlan() {
		setAddLoanContent("content");
		eval(repopulatesPlanForm());
  	//	executeAjaxRequest('payments/template?clientId=' + clientId, 'GET', "", successFunction, formErrorFunction);	  
	}*/
	
	function addService()
{


	  var postUrl = 'servicemasters';
	
var templateSelector = "#servicemasterFormTemplate";
var width = 450; 
var height = 300;
var saveSuccessFunction = function(data, textStatus, jqXHR) {
	$("#dialog-form").dialog("close");
	refreshTableView("servicemaster");return false;
	

};
popupDialogWithFormView("", postUrl, 'POST', "Services", templateSelector, width, height,saveSuccessFunction);
e.preventDefault();
}

function updatePlan(plan_code)
{

		var linkId = this.id;
		var entityId =plan_code;

		var resourceUrl = "plan" + "s/" + plan_code;
		maintainTable('plan', resourceUrl, 'PUT');
		


}
function updatePrice(priceId,plan_code)
{
        
         
       
		var linkId = this.id;
		var entityId =priceId;

		var resourceUrl = "price" + "s/" + priceId+"/update";
		maintainTable('price', resourceUrl, 'PUT');
		


}

function updateService(serviceId)
{

		var linkId = this.id;
		var entityId =serviceId;

		var resourceUrl = "servicemaster" + "s/" + serviceId;
		maintainTable('servicemaster', resourceUrl, 'PUT');
		


}
	
function deleteService(id)
{

		
		var entityId =id;

			var resourceUrl ="servicemaster" + "s/" + entityId;
			var width = 400; 
			var height = 150;
			var saveSuccessFunction = function(data, textStatus, jqXHR) {
			  	$("#dialog-form").dialog("close");
			  	refreshTableView("servicemaster");
			};
			popupConfirmationDialogAndPost(resourceUrl, 'DELETE', 'dialog.title.confirmation.required', width, height, entityId, saveSuccessFunction);
	
}

function editPlan(plan_code)
{

	maintainTable('price', 'prices', 'POST');return false;
}

function deletePlan(plan_code)
{

		
		var entityId =plan_code;

			var resourceUrl ="plan" + "s/" + entityId;
			var width = 400; 
			var height = 150;
			var saveSuccessFunction = function(data, textStatus, jqXHR) {
			  	$("#dialog-form").dialog("close");
			  	refreshTableView("plan");
			};
			popupConfirmationDialogAndPost(resourceUrl, 'DELETE', 'dialog.title.confirmation.required', width, height, entityId, saveSuccessFunction);
	
}

function deletePrice(priceId,planId)
{
          
		var entityId =priceId;

			var resourceUrl ="price" + "s/" + entityId;
			var width = 400; 
			var height = 150;
			var saveSuccessFunction = function(data, textStatus, jqXHR) {
			  	$("#dialog-form").dialog("close");
			  	addPricing(planId);
			  	
			};
			popupConfirmationDialogAndPost(resourceUrl, 'DELETE', 'dialog.title.confirmation.required', width, height, entityId, saveSuccessFunction);
	
}


function refreshClientOrders(clientUrl) {
	var clientId = clientUrl.replace("clients/", "");
	      var getUri="orders/"+clientId+"/orders";

			var successFunction =  function(data, textStatus, jqXHR) {
				
		 
				
				var crudObject = new Object();
				crudObject.crudRows = data;
				var html = $("#orderFormListTemplate").render(crudObject);
				$("#clientorderstab").html(html);  
				
				
				
				var oTable = displayListTable("orderstable");
								
			
					
				var editClientIdentifierSuccessFunction = function(data, textStatus, jqXHR) {
				  	$("#dialog-form").dialog("close");
				  	refreshClientOrders(clientUrl);
				}
				$.each(crudObject.crudRows, function(i, val) {
				     
				     
				     $("#cancelorder" + val.id).click(function(e) {
		            	
		            		var entityId =val.id;

		        			var resourceUrl ="order" + "s/" + entityId;
		        			var width = 400; 
		        			var height = 150;
		        			
		        			var formErrorFunction = function(jqXHR, textStatus, errorThrown) {
		        				handleXhrError(jqXHR, textStatus, errorThrown, "#formErrorsTemplate", "#formerrors");
		        			}
		        			var saveSuccessFunction = function(data, textStatus, jqXHR) {
		        			  	$("#dialog-form").dialog("close");
		        			  	refreshClientOrders(clientUrl);
		        			  	
		        			};
		        			popupConfirmationDialogAndPost(resourceUrl, 'PUT', 'dialog.title.confirmation.required', width, height, entityId, saveSuccessFunction,formErrorFunction);
					});
				     
				     
				     
				     $("#deleteorder" + val.id).click(function(e) {
		            	
		            		var entityId =val.id;

		        			var resourceUrl ="order" + "s/" + entityId;
		        			var width = 400; 
		        			var height = 150;
		        			
		        			var formErrorFunction = function(jqXHR, textStatus, errorThrown) {
		        				handleXhrError(jqXHR, textStatus, errorThrown, "#formErrorsTemplate", "#formerrors");
		        			}
		        			var saveSuccessFunction = function(data, textStatus, jqXHR) {
		        			  	$("#dialog-form").dialog("close");
		        			  	refreshClientOrders(clientUrl);
		        			  	
		        			};
		        			popupConfirmationDialogAndPost(resourceUrl, 'DELETE', 'dialog.title.confirmation.required', width, height, entityId, saveSuccessFunction,formErrorFunction);
					});
				     
				     
				     $("#editorderprice" + val.id).click(function(e) {
		            		var entityId =val.id;
                        
		        			var getUrl ="order" + "s/" + entityId+"/orderprice/"+clientId;
		        			var postUrl="order" + "s/orderprice";
		        			var width = 400; 
		        			var height = 150;
		        			
		        			var formErrorFunction = function(jqXHR, textStatus, errorThrown) {
		        				handleXhrError(jqXHR, textStatus, errorThrown, "#formErrorsTemplate", "#formerrors");
		        			}
		        			var saveSuccessFunction = function(data, textStatus, jqXHR) {
		        			  	$("#dialog-form").dialog("close");
		        			 
		        			  	
		        			  	
		        			  	refreshClientOrders(clientUrl);
		        			  	
		        			  	
		        			};
		        			popupDialogWithFormView(getUrl,postUrl, 'PUT', "Price Details", "#orderPriceFormListTemplate", 1000,300,saveSuccessFunction);
					});
				     
				 	
				     $("#orderdetails" + val.id).click( function(e) {
							var entityId = val.id;
	                        
		        			var getUrl ="order" + "s/" + entityId+"/orderprice/"+clientId;
		        			var postUrl="order" + "s/orderprice";
		        			var width = 400; 
		        			var height = 150;
		        			
		        			var formErrorFunction = function(jqXHR, textStatus, errorThrown) {
		        				handleXhrError(jqXHR, textStatus, errorThrown, "#formErrorsTemplate", "#formerrors");
		        			}
		        			var saveSuccessFunction = function(data, textStatus, jqXHR) {
		        			  	$("#dialog-form").dialog("close");
		        			//  	var html = $("#orderPriceFormListTemplate").render(crudObject);
							//	var oTable = displayListTable("invoicestable");
		        			  	
		        			  	
		        			  	refreshClientOrders(clientUrl);
		        			  	
		        			  	
		        			};
		        			popupDialogWithFormView(getUrl,postUrl, 'PUT', "Order Details", "#orderDetailsFormListTemplate", 1000,300,saveSuccessFunction);
		        			
						});
				     
				     
				     
				});
			}
	  		
	  		executeAjaxRequest(getUri, 'GET', "", successFunction, formErrorFunction);	  
	  		
	}

function refreshClientbillstatments(clientUrl) {
	var clientId = clientUrl.replace("clients/", "");
	      var getUri="billmaster/"+clientId;

			var successFunction =  function(data, textStatus, jqXHR) {
				
		 
				
				var crudObject = new Object();
				crudObject.crudRows = data;
				var html = $("#billStatmentFormListTemplate").render(crudObject);
				$("#clientbillstatementtab").html(html);  
				
				
				
				var oTable = displayListTable("billstable");
		
				
					
				var editClientIdentifierSuccessFunction = function(data, textStatus, jqXHR) {
				  	$("#dialog-form").dialog("close");
				  	refreshClientOrders(clientUrl);
				}
				$.each(crudObject.crudRows, function(i, val) {
					
				     
				     $("#printpdf" + val.id).click(function(e) {
		            		var entityId =this.id;
		            	
		            		var id=entityId.replace("printpdf","");
		            	
		            		var getUrl = 'billmaster/' + id + '/print';
		        			executeAjaxOctetStreamDownloadRequest(getUrl);
							////console.log("Please close the pdf file after download or print finished");
							e.preventDefault();
					});
				 	//$('button.printpdf span').text(doI18N('label.print.invoice.details'));
				     
				});
			}
	  		
	  		executeAjaxRequest(getUri, 'GET', "", successFunction, formErrorFunction);	  
	  		
	}


function refreshClientTransacton(clientUrl) {
	var clientId = clientUrl.replace("clients/", "");
	      var getUri="financialTransactions/"+clientId;
	
			var successFunction =  function(data, textStatus, jqXHR) {
				
				var crudObject = new Object();
				crudObject.crudRows = data;
				var html = $("#transactionFormListTemplate").render(crudObject);
				$("#clienttransactiontab").html(html);  
				var oTable = displayListTable("financialTransactionstable");
				//initialize all edit/delete buttons
		
				$(".invoicedetails").click( function(e) {
					var linkId = this.id;
					var entityId = linkId.replace("invoicedetails", "");
			        var geturl="financialTransactions/"+entityId+"/invoice";
					var saveSuccessFunction = function(data, textStatus, jqXHR) {
					
					  	$("#dialog-form").dialog("close");
					};
					
					popupDialogWithFormView(geturl, "", 'PUT', "Invoice Details", "#invoceDetailsFormTemplate", 1000,300,saveSuccessFunction);
				  
				});
				
			}
	  		executeAjaxRequest(getUri, 'GET', "", successFunction, formErrorFunction);	  
	}


function cancelOrder(id)
{
	//console.log(id);
	var entityId =id;

	var resourceUrl ="order" + "s/" + entityId;
	var width = 400; 
	var height = 150;
	var saveSuccessFunction = function(data, textStatus, jqXHR) {
	  	$("#dialog-form").dialog("close");
	  	refreshClientOrders(clientUrl);
	};
	popupConfirmationDialogAndPost(resourceUrl, 'PUT', 'dialog.title.confirmation.required', width, height, entityId, saveSuccessFunction);
	
	}

/*function setBillingFrequency(planCode) {
	//console.log(1);
	var successFunction = function(data, textStatus, jqXHR) {
		removeErrors("#formerrors" +
				"");
		$("#frequencyDiv").html('');
		var htmlvar=$("#allBillingFreqsDropdownTemplate").render(data);
		$("#frequencyDiv").html(htmlvar);
	  	
	};
	executeAjaxRequest('orders/'+planCode+'/template', 'GET', "", successFunction, formErrorFunction);
	//executeAjaxRequest('orders/'+plancode+'/template', 'GET', "","#orderFormTemplate", successFunction, formErrorFunction);

}*/

function addPricing(plan_code) {
	successFunction =  function(data, textStatus, jqXHR) {
	var getUrl ='prices/'+plan_code;

var tableHtml = "<p>Hello</p>";
		var crudObject = new Object();
		crudObject.crudRows = data;
		var html = $("#serviceFormListTemplate").render(crudObject);
		$("#listplaceholder").html(html);  
	
		 var oTable=displayListTable("servicestable");
	$('.newpricebtn').button(
	  ).click(function(e) {
		
		  var getUrl ='prices/template?plan_code='+plan_code;
		  var postUrl = 'prices/'+ plan_code;
		
	var templateSelector = "#priceFormTemplate";
	var width = 650; 
	var height = 300;
	var saveSuccessFunction = function(data, textStatus, jqXHR) {
	  	$("#dialog-form").dialog("close");
	  	addPricing(plan_code);return false;	
	  
	};
	popupDialogWithFormView(getUrl, postUrl, 'POST', "prices", templateSelector, width, height,saveSuccessFunction);
	 e.preventDefault();
	  });
	

	$(".updatePrice").click( function(e) {
		

		var linkId = this.id;
		var entityId = linkId.replace("updatePrice", "");

        var geturl="prices/"+entityId+"/update?template=true";
		var resourceUrl = "price" + "s/" + entityId+"/update";
		var saveSuccessFunction = function(data, textStatus, jqXHR) {
		  	$("#dialog-form").dialog("close");
		  	addPricing(plan_code);
		  	
		};
		
		popupDialogWithFormView(geturl, resourceUrl, 'PUT', "Update Price", "#priceFormTemplate", 700,300,saveSuccessFunction);
	  
	});
	
	$(".deletePrice").click( function(e) {
		

		var linkId =this.id;
		var entityId = linkId.replace("deletePrice", "");

		var resourceUrl ="price" + "s/" + entityId;
		var width = 400; 
		var height = 150;
		var saveSuccessFunction = function(data, textStatus, jqXHR) {
		  	$("#dialog-form").dialog("close");
		  	addPricing(plan_code);
		  	
		};
		popupConfirmationDialogAndPost(resourceUrl, 'DELETE', 'dialog.title.confirmation.required', width, height, entityId, saveSuccessFunction);
	
	});

	};
	executeAjaxRequest('prices/'+plan_code, 'GET', "", successFunction);
}

function addPlan()
{

	maintainTable('plan', 'plans', 'POST');return false;
}

function repopulatesPlanForm() {
		
		successFunction =  function(data, textStatus, jqXHR) {
			
				var formHtml = $("#planFormTemplate").render(data);
			
				$("#inputarea").html(formHtml);

		
				$('.datepickerfield').datepicker({constrainInput: true, defaultDate: 0, maxDate: 0, dateFormat: 'dd MM yy'});
				$('.datepickerfieldnoconstraint').datepicker({constrainInput: true, defaultDate: 0, dateFormat: 'dd MM yy'});
			
				$('#addservices').click(function() {  
					return !$('#notSelectedServices option:selected').remove().appendTo('#services');  
				});	
				$('#removeservices').click(function() {  
					return !$('#services option:selected').remove().appendTo('#notSelectedServices');  
				}); 
				
				
				$('#submitloanapp').button().click(function(e) {
					submitPlanApplication();
				    e.preventDefault();
				});
				$('button#submitPayment span').text(doI18N('dialog.button.submit'));
				$('#cancelloanapp').button().click(function(e) {
					setSubscriptionContent("content");
				    e.preventDefault();
				});
				$('button#cancelloanapp span').text(doI18N('dialog.button.cancel'));
				
				
			};
		
		
			executeAjaxRequest('plans/template' , 'GET', "", successFunction, formErrorFunction);	  

	}
	function setBillingFrequency(planCode) {
		removeErrors("#formerrors");
		var htmlvar=$("#allBillingFreqsDropdownTemplate").render('');
		$("#frequencyDiv").html(htmlvar);
	var successFunction = function(data, textStatus, jqXHR) {
		var htmlvar=$("#allBillingFreqsDropdownTemplate").render(data);
		$("#frequencyDiv").html(htmlvar);
	  	
	};
	executeAjaxRequest('orders/'+planCode+'/template', 'GET', "", successFunction, formErrorFunction);
	//executeAjaxRequest('orders/'+plancode+'/template', 'GET', "","#orderFormTemplate", successFunction, formErrorFunction);

}
	
	function addPaymode() {
		successFunction =  function(data, textStatus, jqXHR) {
		//var getUrl ='prices/'+plan_code;
		var crudObject = new Object();
			crudObject.crudRows = data;
			var html = $("#paymodeFormListTemplate").render(crudObject);
			$("#listplaceholder").html(html);  
		
			 var oTable=displayListTable("paymodestable");
			 
			
		$('.newpaymodebtn').button(
		  ).click(function(e) {
			
			  var getUrl ='paymodes/template';
			  var postUrl = 'paymodes';
			
		var width = 650; 
		var height = 300;
		var templateSelector = "#paymodeFormtemplate";
		var saveSuccessFunction = function(data, textStatus, jqXHR) {
		  	$("#dialog-form").dialog("close");
		  	addPaymode();return false;	
		  
		};
		popupDialogWithFormView(getUrl, postUrl, 'POST', "paymodes", templateSelector, width, height,saveSuccessFunction);
	//	popupDialogWithFormView(getUrl, postUrl, 'POST', "paymodes","#paymodeFormTemplate", 700, 300,saveSuccessFunction);
		// e.preventDefault();
		  });
		

		$(".updatepaymode").click( function(e) {
			var linkId = this.id;
			var entityId = linkId.replace("updatepaymode", "");

	        var geturl="paymodes/"+entityId;
			var resourceUrl = "paymode" + "s/" + entityId;
			var saveSuccessFunction = function(data, textStatus, jqXHR) {
			  	$("#dialog-form").dialog("close");
			  	addPaymode();
			  	
			};
			
			popupDialogWithFormView(geturl, resourceUrl, 'PUT', "Update paymode", "#paymodeFormTemplate", 700,300,saveSuccessFunction);
		  
		});
		
		$(".deletepaymode").click( function(e) {
			

			var linkId =this.id;
			var entityId = linkId.replace("deletepaymode", "");

			var resourceUrl ="paymode" + "s/" + entityId;
			var width = 400; 
			var height = 150;
			var saveSuccessFunction = function(data, textStatus, jqXHR) {
			  	$("#dialog-form").dialog("close");
			  	addPaymode();
			  	
			};
			popupConfirmationDialogAndPost(resourceUrl, 'DELETE', 'dialog.title.confirmation.required', width, height, entityId, saveSuccessFunction);
		
		});

		};
		executeAjaxRequest('paymodes', 'GET', "", successFunction);
	}
	
	function refreshInventoryItemDetails(clientUrl){
		////console.log(clientUrl);
		var clientId = clientUrl.replace("clients/", "");
	    var getUri='itemdetails/';//clientId

		
		var successFunction =  function(data, textStatus, jqXHR) {
		
			var crudObject = new Object();
				crudObject.crudRows = data;
			
				var html = $("#inventoryItemListTemplate").render(crudObject);
				$("#inventorytab").html(html);  
			
				//console.log(":D");
				
				var oTable = displayListTable("inventorylisttable");
				oTable.fnFilter('');
				
				
				
					
				var editClientIdentifierSuccessFunction = function(data, textStatus, jqXHR) {
				  	$("#dialog-form").dialog("close");
				  	refreshInventoryItemDetails(clientUrl);
				}
				$(".newinventoryadditem").click( function(e) {
					//alert("inventory clicked");
			var getUrl='itemdetails/template?grnId=';
			  var postUrl='itemdetails/';//+clientId;
				var templateSelector = "#inventoryItemFormTemplate";
				//console.log("inside templateselector");
				var width = 700; 
				var height = 420;
				
				
				var saveSuccessFunction = function(data, textStatus, jqXHR) {
					//alert("Data Saved with Auto-Generated ID: "+data);
					//$("#dialog-form").dialog("close");
					var id = $("#dialog-form #id").val();
					getUri='itemdetails/template?grnId='+id;
					var officeIdSelectSuccess = function(loanReassignmentData, textStatus, jqXHR){
						repopulateOpenPopupDialogWithFormViewData(loanReassignmentData, postUrl, 'GET', 'Inventory(Grn&ItemDetails)', '#inventoryItemFormTemplate', 700, 420, saveSuccessFunction)
					}
					executeAjaxRequest(getUri, "GET", "", officeIdSelectSuccess, formErrorFunction);
					refreshInventoryItemDetails(clientUrl);
				};
				//alert("calling populate");
				popupDialogWithFormView(getUrl,postUrl, 'POST', "Inventory(Grn&ItemDetails)", templateSelector, width, height,saveSuccessFunction);
				//alert("populate called");
				e.preventDefault();
				//console.log("after popupDialogWithFormView");
				});
				
				
					}

	  		executeAjaxRequest(getUri, 'GET', "", successFunction, formErrorFunction);	  
	}
	
	function refreshClientOneTimeSaleDetails(clientUrl)
	{
		
		var clientId = clientUrl.replace("clients/", "");
	      var getUri="onetimesales/"+clientId;

			var successFunction =  function(data, textStatus, jqXHR) {
		
			var crudObject = new Object();
				crudObject.crudRows = data;
			
				var html = $("#oneTimeSaleListTemplate").render(crudObject);
				$("#clientsaletab").html(html);  
			
			 
				
				var oTable = displayListTable("onetimelisttable");
				oTable.fnFilter('');
				
				
				
					
				var editClientIdentifierSuccessFunction = function(data, textStatus, jqXHR) {
				  	$("#dialog-form").dialog("close");
				  	refreshClientOrders(clientUrl);
				}
				$(".newadditem").click( function(e) {
					//console.log("button clicked");
					var getUrl='onetimesales/template';
			  var postUrl='onetimesales/'+clientId;
				var templateSelector = "#oneTimeSaleFormTemplate";
				var width = 700; 
				var height = 300;
				var saveSuccessFunction = function(data, textStatus, jqXHR) {
					$("#dialog-form").dialog("close");
					refreshClientOneTimeSaleDetails(clientUrl);
					

				};
				popupDialogWithFormView(getUrl,postUrl, 'POST', "One Time Sale", templateSelector, width, height,saveSuccessFunction);
				e.preventDefault();
				
				});
				
				
					}
	  		
	  		executeAjaxRequest(getUri, 'GET', "", successFunction, formErrorFunction);	  
	}
	
	function addNewPaymode()
	{


		  var postUrl = 'paymodes';
		
	var templateSelector = "#paymodeFormTemplate";
	var width = 400; 
	var height = 200;
	var saveSuccessFunction = function(data, textStatus, jqXHR) {
		$("#dialog-form").dialog("close");
		addPaymode();
		

	};
	popupDialogWithFormView("", postUrl, 'POST', "paymodes", templateSelector, width, height,saveSuccessFunction);
	e.preventDefault();
	}
	
	function attachedlink(ticketId)
	{

			var linkId = this.id;
			var entityId =ticketId;
			var getUrl = "ticketmaster" + "s/" + ticketId+"/print";
			executeAjaxOctetStreamDownloadRequest(getUrl);
			


	}
	function updatePrice(id,clientId){
		
		var clientUrl = 'clients/' + clientId;
		
		var postUrl = 'orders/'+id+'/orderprice';
		
		var templateSelector = "#orderPriceFormListTemplate";
		
		 var serializedArray = {};
		 
	    	serializedArray["price"] = $('#price'+id).val();
	    	serializedArray["locale"] = $('#locale').val();
				var newFormData = JSON.stringify(serializedArray);
		var saveSuccessFunction = function(data, textStatus, jqXHR) {
			//$("#dialog-form").dialog("close");
			//console.log('price updated successfully');
			
			refreshClientOrders(clientUrl);

		};
	executeAjaxRequest(postUrl, 'PUT', newFormData, saveSuccessFunction, formErrorFunction);
	
				
		//popupDialogWithFormView("", postUrl, 'PUT', "paymodes", templateSelector, width, height,saveSuccessFunction);
		e.preventDefault();
	}
	
	function showTickets(){
		
		var postUrl = 'ticketmasters/assignedTickets';
		var onListRetrievialSuccessFunction = function(data) {
		var ticketsListObject = new Object();
		ticketsListObject.crudRows = data;
	    
		var tableHtml = "<p>Hello</p>";
		tableHtml = $("#ticketsListTemplate1").render(ticketsListObject);
		$("#content").html(tableHtml);
		var oTable = displayListTable("ticketslisttable");
		
	
			
				
					refreshClientTicketDetails(clientUrl);
				
  	};

  	executeAjaxRequest(postUrl, 'GET', "", onListRetrievialSuccessFunction, formErrorFunction);
	}
	
	
	function refreshClientTicketDetails(clientUrl)
	{
		
		var clientId = clientUrl.replace("clients/", "");
	      var getUri="ticketmasters/"+clientId;

			var successFunction =  function(data, textStatus, jqXHR) {
		
			var crudObject = new Object();
				crudObject.crudRows = data;
				var html = $("#ticketFormListTemplate").render(crudObject);
				$("#clienttickettab").html(html);  
				
				var oTable = displayListTable("ticketstable");
				oTable.fnFilter('');
					
				var editClientIdentifierSuccessFunction = function(data, textStatus, jqXHR) {
				  	$("#dialog-form").dialog("close");
				  	refreshClientOrders(clientUrl);
				}
				$.each(crudObject.crudRows, function(i, val) {
				     
					 $("#editticket" + val.id).click(function(e) {
			            		
			            	
			            		var entityId =val.id;
			            		var geturl="ticketmasters/"+clientId+"/update/"+entityId;
			            		var putUrl = clientUrl + '/documents/'+val.id+'/attachment';
			            		
			        			
			        			var width = 670; 
			        			var height = 350;
			        			
			        			var formErrorFunction = function(jqXHR, textStatus, errorThrown) {
			        				handleXhrError(jqXHR, textStatus, errorThrown, "#formErrorsTemplate", "#formerrors");
			        			}
			        			var saveSuccessFunction = function(data, textStatus, jqXHR) {
			        			  	$("#dialog-form").dialog("close");
			        			  	refreshClientTicketDetails(clientUrl);
			        			};
			        			popupDialogWithFormView(geturl, putUrl, 'POST', "Edit Ticket", "#ticketDetailFormTemplate", width,height,saveSuccessFunction);
						});
					 
					 $("#historyticket" + val.id).click(function(e) {
			            		
			            		var entityId =val.id;
			            		var geturl="ticketmasters/"+entityId+"/history";
			            		var width = 800; 
			        			var height = 350;
			            		
			            		var saveSuccessFunction =  function(data, textStatus, jqXHR) {
			            			
			            			var crudObject = new Object();
			            				crudObject.crudRows = data;
			            				var html = $("#ticketclosedFormTemplate").render(crudObject);
			            				            				
			            				$.each(crudObject.crudRows, function(i, val) {
			            					           				     
			           				     $("#attachedlink" + val.id).button({icons: {
			           		                }
			           		            	}).click(function(e) {
			           		            		
			           					});
			           				 	
			           				     
			           				});

			            		}
			            			  
			            				popupDialogWithFormView(geturl, "", 'GET', "History", "#tickethistoryFormTemplate", width,height,saveSuccessFunction);
						});

					 $("#closeticket" + val.id).click(function(e) {
	         	      
			            		var entityId =val.id;
			            		var getUrl ='ticketmasters/template';
			            		var resourceUrl ='ticketmasters/'+entityId ;
			            		        			
			        			var width = 670; 
			        			var height = 350;
			        			
			        			var formErrorFunction = function(jqXHR, textStatus, errorThrown) {
			        				handleXhrError(jqXHR, textStatus, errorThrown, "#formErrorsTemplate", "#formerrors");
			        			}
			        			var saveSuccessFunction = function(data, textStatus, jqXHR) {
			        			  	$("#dialog-form").dialog("close");
			        			  	refreshClientTicketDetails(clientUrl);
			        			};
			        			popupDialogWithFormView(getUrl, resourceUrl, 'PUT', "Close Ticket", "#ticketclosedFormTemplate", width,height,saveSuccessFunction);
			            		
			            		
						});

				     
				});
			}
	  		
	  		executeAjaxRequest(getUri, 'GET', "", successFunction, formErrorFunction);	  
	}
	
	
	
	function addAddr()
	{


		  var postUrl = 'paymodes';
		var getUrl='address/template';
	var templateSelector = "#addressFormTemplate";
	var width = 700; 
	var height = 300;
	var saveSuccessFunctio
	n = function(data, textStatus, jqXHR) {
		$("#dialog-form").dialog("close");
	
		

	};
	popupDialogWithFormView(getUrl, postUrl, 'POST', "paymodes", templateSelector, width, height,saveSuccessFunction);
	e.preventDefault();
	}
	
	function retrievePlace()
	{
	var sel = document.getElementById('state');
    var sv = sel.options[sel.selectedIndex].text;
    //console.log(sv);
	}
	
	
	function generateInvoice(){
		var postUrl = 'billingorder/generateInvoice';
		var width = 350; 
		var height = 200;
		var templateSelector = "#invoiceFormTemplate";
		var saveSuccessFunction = function(data, textStatus, jqXHR) {
			$("#dialog-form").dialog("close");
			showILClient(clientId);
		};
		popupDialogWithFormView("", postUrl, 'POST', "Invoicing", templateSelector, width, height,saveSuccessFunction );
	}	
	
	
	function addItem()
	{
		
		
		maintainTable('item','items', 'POST');
	}