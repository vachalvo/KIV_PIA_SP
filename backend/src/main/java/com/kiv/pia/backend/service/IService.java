package com.kiv.pia.backend.service;

import java.util.Collection;
import java.util.Optional;
import java.util.UUID;

public interface IService<T, S> {
    Collection<T> findAll();

    Optional<T> findById(S id);

    T saveOrUpdate(T t);

    void deleteById(S id);
}
