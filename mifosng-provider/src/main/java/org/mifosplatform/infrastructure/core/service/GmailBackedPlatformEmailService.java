package org.mifosplatform.infrastructure.core.service;

import org.apache.commons.mail.DefaultAuthenticator;
import org.apache.commons.mail.Email;
import org.apache.commons.mail.EmailException;
import org.apache.commons.mail.SimpleEmail;
import org.mifosplatform.infrastructure.core.domain.EmailDetail;
import org.springframework.stereotype.Service;

@Service
public class GmailBackedPlatformEmailService implements PlatformEmailService {

    @Override
    public void sendToUserAccount(final EmailDetail emailDetail, final String unencodedPassword) {
        Email email = new SimpleEmail();

        String authuserName = "info@hugotechnologies.com";

        String authuser = "manojanand@hugotechnologies.com";
        String authpwd = "manoj@123";

        // Very Important, Don't use email.setAuthentication()
        email.setAuthenticator(new DefaultAuthenticator(authuser, authpwd));
        email.setDebug(false); // true if you want to debug
        email.setHostName("smtp.gmail.com");
        try {
            email.getMailSession().getProperties().put("mail.smtp.starttls.enable", "true");
            email.setFrom(authuser, authuserName);

            StringBuilder subjectBuilder = new StringBuilder().append("Educational Service: ").append(emailDetail.getContactName()).append(" user account creation.");

            email.setSubject(subjectBuilder.toString());

            String sendToEmail = emailDetail.getAddress();

            StringBuilder messageBuilder = new StringBuilder().append("You are receiving this email as your email account: ").append(sendToEmail).append(" has being used to create a user account for an organisation named [").append(emailDetail.getOrganisationName()).append("] on Educational Service.").append("You can login using the following credentials: username: ").append(emailDetail.getUsername()).append(" password: ").append(unencodedPassword);

            email.setMsg(messageBuilder.toString());

            email.addTo(sendToEmail, emailDetail.getContactName());
            email.send();
        } catch (EmailException e) {
            throw new PlatformEmailSendException(e);
        }
    }
}