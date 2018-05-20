---
title: Spring 杂项
date: 2018-05-20 13:33:46
tags:
    - Java
    - Spring
---
1. Spring 生成的对象默认是 singleton 的。可以通过设置 scope 属性为 prototype 来改为 multiton
    ```xml
    <bean id="user" class="modle.User" scope="prototype"></bean>
    ```

    or

    ```java
    @Component
    @Scope("prototype")
    public class User {
    }
    ```

