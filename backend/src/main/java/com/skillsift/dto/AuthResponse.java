package com.skillsift.dto;

public class AuthResponse {

    private String token;
    private Long id;
    private String name;
    private String email;
    private String education;
    private String college;

    public AuthResponse() {}

    public AuthResponse(String token, Long id, String name, String email, String education, String college) {
        this.token = token;
        this.id = id;
        this.name = name;
        this.email = email;
        this.education = education;
        this.college = college;
    }

    public String getToken() { return token; }
    public void setToken(String token) { this.token = token; }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public String getEducation() { return education; }
    public void setEducation(String education) { this.education = education; }

    public String getCollege() { return college; }
    public void setCollege(String college) { this.college = college; }
}
