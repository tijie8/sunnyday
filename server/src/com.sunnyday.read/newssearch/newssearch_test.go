package newssearch

import "testing"

func TestSearchNews(t *testing.T) {
	result := Search("a")
	if result != "a" {
		t.Error("result is " + result)
	}
}
