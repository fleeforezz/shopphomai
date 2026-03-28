package com.job.shopphomai.domain.enums;
import com.fasterxml.jackson.annotation.JsonCreator;

package com.job.shopphomai.domain.enum;

public enum Nationality {
    
    VIETNAM,
    THAILAND,
    CAMBODIA,
    JAPAN,
    CHINA,
    KORIA;

    @JsonCreator
    public static Nationality fromString(String value) {
        return Nationality.valueOf(value.toUpperCase());
    }
}
