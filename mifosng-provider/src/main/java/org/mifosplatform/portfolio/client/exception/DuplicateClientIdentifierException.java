package org.mifosplatform.portfolio.client.exception;

import org.mifosplatform.infrastructure.core.exception.AbstractPlatformDomainRuleException;

/**
 * A {@link RuntimeException} thrown when a client identifier of the particular
 * type is already present
 */
public class DuplicateClientIdentifierException extends AbstractPlatformDomainRuleException {

    private Long documentTypeId;
    private String identifierKey;
    private String identifierType;

    public DuplicateClientIdentifierException(final String identifierType) {
        super("error.msg.clientIdentifier.type.duplicate", "Client identifier of type " + identifierType
                + " is already present for this client", identifierType);
        this.identifierType = identifierType;
    }

    public DuplicateClientIdentifierException(final Long documentTypeId, final String identifierType, final String identifierKey) {
        super("error.msg.clientIdentifier.identityKey.duplicate", "Client identifier of type " + identifierType + " with value of "
                + identifierKey + " already exists.", identifierType, identifierKey);
        this.documentTypeId = documentTypeId;
        this.identifierType = identifierType;
        this.identifierKey = identifierKey;
    }

    public DuplicateClientIdentifierException(final String clientName, final String officeName, final String identifierType,
            final String identifierKey) {
        super("error.msg.clientIdentifier.identityKey.duplicate", "Client " + clientName + "under " + officeName + " Branch already has a "
                + identifierType + " with unique key " + identifierKey, clientName, officeName, identifierType, identifierKey);
        this.identifierType = identifierType;
        this.identifierKey = identifierKey;
    }

    public Long getDocumentTypeId() {
        return documentTypeId;
    }

    public String getIdentifierKey() {
        return identifierKey;
    }

    public String getIdentifierType() {
        return identifierType;
    }
}