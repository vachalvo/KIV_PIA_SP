package com.kiv.pia.backend.model.request;

import javax.validation.GroupSequence;

@GroupSequence({FirstCheckGroup.class, SecondCheckGroup.class, ThirdCheckGroup.class})
public interface OrderedChecks {
}
